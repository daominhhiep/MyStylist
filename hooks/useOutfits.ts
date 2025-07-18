
import { useState, useEffect } from 'react';
import { DocumentSnapshot } from 'firebase/firestore';
import { getOutfits, Outfit } from '../lib/firestore';

export const useOutfits = (pageSize: number = 12) => {
  const [outfits, setOutfits] = useState<Outfit[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [lastDoc, setLastDoc] = useState<DocumentSnapshot | null>(null);

  const loadOutfits = async (reset: boolean = false) => {
    try {
      setLoading(true);
      const { outfits: newOutfits, lastDoc: newLastDoc } = await getOutfits(
        pageSize, 
        reset ? undefined : lastDoc
      );
      
      if (reset) {
        setOutfits(newOutfits);
      } else {
        setOutfits(prev => [...prev, ...newOutfits]);
      }
      
      setLastDoc(newLastDoc);
      setHasMore(newOutfits.length === pageSize);
    } catch (error) {
      console.error('Error loading outfits:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    if (!loading && hasMore) {
      loadOutfits(false);
    }
  };

  const refresh = () => {
    setLastDoc(null);
    setHasMore(true);
    loadOutfits(true);
  };

  useEffect(() => {
    loadOutfits(true);
  }, []);

  return {
    outfits,
    loading,
    hasMore,
    loadMore,
    refresh
  };
};
