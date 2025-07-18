
import { useState, useEffect } from 'react';
import { getOutfits, Outfit } from '../lib/firestore';
import { DocumentSnapshot } from 'firebase/firestore';
import { outfits_mock } from '../mock/data';

export const useOutfits = () => {
  const [outfits, setOutfits] = useState<Outfit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [lastDoc, setLastDoc] = useState<DocumentSnapshot | null>(null);
  const [usingMockData, setUsingMockData] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const loadOutfits = async (reset: boolean = false) => {
    try {
      setLoading(true);
      setError(null);

      const docToUse = reset ? null : lastDoc;
      const { outfits: newOutfits, lastDoc: newLastDoc } = await getOutfits(12, docToUse || undefined);
      
      if (reset) {
        setOutfits(newOutfits);
      } else {
        setOutfits(prev => [...prev, ...newOutfits]);
      }
      
      setLastDoc(newLastDoc);
      setHasMore(newOutfits.length === 12);
      setUsingMockData(false);
      
    } catch (error) {
      console.error('Error loading outfits:', error);
      
      // Fallback to mock data
      if (reset) {
        console.log('Using mock data as fallback');
        const pageSize = 12;
        const startIndex = 0;
        const endIndex = Math.min(startIndex + pageSize, outfits_mock.length);
        setOutfits(outfits_mock.slice(startIndex, endIndex));
        setCurrentPage(0);
        setUsingMockData(true);
        setHasMore(endIndex < outfits_mock.length);
      }
      
      setError('Failed to load outfits from database, using sample data');
    } finally {
      setLoading(false);
    }
  };

  const loadMore = async () => {
    if (loading || !hasMore) return;

    if (usingMockData) {
      const pageSize = 12;
      const nextPage = currentPage + 1;
      const startIndex = nextPage * pageSize;
      const endIndex = Math.min(startIndex + pageSize, outfits_mock.length);
      
      if (startIndex < outfits_mock.length) {
        setOutfits(prev => [...prev, ...outfits_mock.slice(startIndex, endIndex)]);
        setCurrentPage(nextPage);
        setHasMore(endIndex < outfits_mock.length);
      }
    } else {
      await loadOutfits(false);
    }
  };

  useEffect(() => {
    loadOutfits(true);
  }, []);

  return {
    outfits,
    loading,
    error,
    hasMore,
    loadMore,
    refetch: () => loadOutfits(true),
    usingMockData
  };
};
