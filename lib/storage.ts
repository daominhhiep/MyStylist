
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from './firebase';

export const uploadImage = async (file: File, path: string): Promise<string> => {
  try {
    const imageRef = ref(storage, path);
    const snapshot = await uploadBytes(imageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};

export const deleteImage = async (path: string): Promise<void> => {
  try {
    const imageRef = ref(storage, path);
    await deleteObject(imageRef);
  } catch (error) {
    console.error('Error deleting image:', error);
    throw error;
  }
};

export const uploadOutfitImages = async (files: FileList, outfitId: string): Promise<string[]> => {
  const uploadPromises = Array.from(files).map(async (file, index) => {
    const path = `outfits/${outfitId}/image_${index}_${Date.now()}`;
    return await uploadImage(file, path);
  });
  
  return Promise.all(uploadPromises);
};

export const uploadUserAvatar = async (file: File, userId: string): Promise<string> => {
  const path = `users/${userId}/avatar_${Date.now()}`;
  return await uploadImage(file, path);
};
