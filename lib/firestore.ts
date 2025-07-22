import {
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  getDocs, 
  getDoc, 
  query, 
  orderBy, 
  limit, 
  startAfter,
  where,
  DocumentSnapshot
} from 'firebase/firestore';
import { db } from './firebase';

export interface OutfitItem {
  id: string;
  name: string;
  brand: string;
  description?: string;
  shopeeLink?: string;
  tiktokLink?: string;
  category: string;
  image?: string;
  sizes?: string[];
  colors?: { name: string; label: string; color: string }[];
  tags?: string[];
}

export interface Outfit {
  id: string;
  title: string;
  description: string;
  images: string[];
  items: OutfitItem[];
  tags: string[];
  style: string;
  createdAt: string;
  updatedAt?: string;
  createdBy: string;
  isHot?: boolean;
  isSponsored?: boolean;
  isTrending?: boolean;
  views?: number;
  clicks?: number;
  modelSpecs?: {
    height: string;
    weight: string;
    size: string;
  };
}

// Outfit functions
export const createOutfit = async (outfitData: Omit<Outfit, 'id'>): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, 'outfits'), outfitData);
    return docRef.id;
  } catch (error) {
    console.error('Error creating outfit:', error);
    throw error;
  }
};

export const updateOutfit = async (outfitId: string, outfitData: Partial<Outfit>): Promise<void> => {
  try {
    const outfitRef = doc(db, 'outfits', outfitId);
    await updateDoc(outfitRef, {
      ...outfitData,
      updatedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error updating outfit:', error);
    throw error;
  }
};

export const deleteOutfit = async (outfitId: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, 'outfits', outfitId));
  } catch (error) {
    console.error('Error deleting outfit:', error);
    throw error;
  }
};

export const getOutfits = async (pageSize: number = 12, lastDoc?: DocumentSnapshot): Promise<{outfits: Outfit[], lastDoc: DocumentSnapshot | null}> => {
  try {
    let q = query(
      collection(db, 'outfits'),
      orderBy('createdAt', 'desc'),
      limit(pageSize)
    );

    if (lastDoc) {
      q = query(
        collection(db, 'outfits'),
        orderBy('createdAt', 'desc'),
        startAfter(lastDoc),
        limit(pageSize)
      );
    }

    const querySnapshot = await getDocs(q);
    const outfits: Outfit[] = [];
    let newLastDoc: DocumentSnapshot | null = null;

    querySnapshot.forEach((doc) => {
      outfits.push({ id: doc.id, ...doc.data() } as Outfit);
      newLastDoc = doc;
    });

    return { outfits, lastDoc: newLastDoc };
  } catch (error) {
    console.error('Error getting outfits:', error);
    throw error;
  }
};

export const getOutfitById = async (outfitId: string): Promise<Outfit | null> => {
  try {
    const docRef = doc(db, 'outfits', outfitId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Outfit;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error getting outfit:', error);
    throw error;
  }
};

export const getOutfitsByStyle = async (style: string): Promise<Outfit[]> => {
  try {
    const q = query(
      collection(db, 'outfits'),
      where('style', '==', style),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    const outfits: Outfit[] = [];
    
    querySnapshot.forEach((doc) => {
      outfits.push({ id: doc.id, ...doc.data() } as Outfit);
    });
    
    return outfits;
  } catch (error) {
    console.error('Error getting outfits by style:', error);
    throw error;
  }
};

// Item functions
export const createItem = async (itemData: Omit<OutfitItem, 'id'>): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, 'items'), itemData);
    return docRef.id;
  } catch (error) {
    console.error('Error creating item:', error);
    throw error;
  }
};

export const getItems = async (): Promise<OutfitItem[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, 'items'));
    const items: OutfitItem[] = [];
    
    querySnapshot.forEach((doc) => {
      items.push({ id: doc.id, ...doc.data() } as OutfitItem);
    });
    
    return items;
  } catch (error) {
    console.error('Error getting items:', error);
    throw error;
  }
};

// Analytics functions
export const incrementOutfitViews = async (outfitId: string): Promise<void> => {
  try {
    const outfitRef = doc(db, 'outfits', outfitId);
    const outfitSnap = await getDoc(outfitRef);
    
    if (outfitSnap.exists()) {
      const data = outfitSnap.data();
      const currentViews = data?.views || 0;
      await updateDoc(outfitRef, { views: currentViews + 1 });
    }
  } catch (error) {
    console.error('Error incrementing views:', error);
    throw error; // Re-throw to allow fallback handling
  }
};

export const incrementOutfitClicks = async (outfitId: string): Promise<void> => {
  try {
    const outfitRef = doc(db, 'outfits', outfitId);
    const outfitSnap = await getDoc(outfitRef);
    
    if (outfitSnap.exists()) {
      const data = outfitSnap.data();
      const currentClicks = data?.clicks || 0;
      await updateDoc(outfitRef, { clicks: currentClicks + 1 });
    }
  } catch (error) {
    console.error('Error incrementing clicks:', error);
    throw error; // Re-throw to allow fallback handling
  }
};
