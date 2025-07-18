
import { createContext, useContext, useEffect, useState } from 'react';
import { 
  User, 
  onAuthStateChanged, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut as firebaseSignOut 
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';

interface UserProfile {
  email: string;
  name: string;
  avatar: string;
  height: string;
  weight: string;
  bodyType: string;
  preferredStyle: string;
  size: string;
  createdAt: string;
  updatedAt?: string;
}

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  updateUserProfile: (profileData: Partial<UserProfile>) => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  userProfile: null,
  signInWithGoogle: async () => {},
  signOut: async () => {},
  updateUserProfile: async () => {},
  loading: true
});

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check localStorage for cached user data
    const cachedUser = localStorage.getItem('user');
    const cachedProfile = localStorage.getItem('userProfile');
    
    if (cachedUser && cachedProfile) {
      try {
        setUser(JSON.parse(cachedUser));
        setUserProfile(JSON.parse(cachedProfile));
      } catch (error) {
        console.error('Error parsing cached user data:', error);
        localStorage.removeItem('user');
        localStorage.removeItem('userProfile');
      }
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      
      if (user) {
        // Cache user data in localStorage
        localStorage.setItem('user', JSON.stringify({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL
        }));

        try {
          // Lấy thông tin profile từ Firestore
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            const profileData = userDoc.data();
            setUserProfile(profileData);
            localStorage.setItem('userProfile', JSON.stringify(profileData));
          } else {
            // Tạo profile mới nếu chưa có
            const newProfile = {
              email: user.email,
              name: user.displayName,
              avatar: user.photoURL,
              height: '',
              weight: '',
              bodyType: '',
              preferredStyle: '',
              size: '',
              createdAt: new Date().toISOString()
            };
            await setDoc(doc(db, 'users', user.uid), newProfile);
            setUserProfile(newProfile);
            localStorage.setItem('userProfile', JSON.stringify(newProfile));
          }
        } catch (error) {
          console.error('Error accessing Firestore:', error);
          // Use mock profile data if Firestore fails
          const mockProfile = {
            email: user.email,
            name: user.displayName,
            avatar: user.photoURL,
            height: '170cm',
            weight: '65kg',
            bodyType: 'Normal',
            preferredStyle: 'Streetwear',
            size: 'M',
            createdAt: new Date().toISOString()
          };
          setUserProfile(mockProfile);
          localStorage.setItem('userProfile', JSON.stringify(mockProfile));
        }
      } else {
        setUserProfile(null);
        localStorage.removeItem('user');
        localStorage.removeItem('userProfile');
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      localStorage.removeItem('user');
      localStorage.removeItem('userProfile');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const updateUserProfile = async (profileData: Partial<UserProfile>) => {
    if (!user) return;
    
    try {
      const updatedProfile = {
        ...userProfile,
        ...profileData,
        updatedAt: new Date().toISOString()
      };
      
      await setDoc(doc(db, 'users', user.uid), updatedProfile, { merge: true });
      setUserProfile(updatedProfile);
      localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
    } catch (error) {
      console.error('Error updating user profile:', error);
      // Update locally even if Firestore fails
      const updatedProfile = {
        ...userProfile,
        ...profileData,
        updatedAt: new Date().toISOString()
      };
      setUserProfile(updatedProfile);
      localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
      throw error;
    }
  };

  const value = {
    user,
    userProfile,
    signInWithGoogle,
    signOut,
    updateUserProfile,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
