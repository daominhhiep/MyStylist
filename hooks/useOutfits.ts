
import { useState, useEffect } from 'react';
import { getOutfits, Outfit } from '../lib/firestore';
import { DocumentSnapshot } from 'firebase/firestore';

// Mock data fallback
const mockOutfits: Outfit[] = [
  {
    id: '1',
    title: 'Urban Streetwear Vibe',
    description: 'Bold and edgy streetwear look perfect for city adventures',
    images: [
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400',
      'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400'
    ],
    items: [
      {
        id: 'hoodie-001',
        name: 'Oversized Hoodie',
        brand: 'UrbanStyle',
        price: '$65',
        shopeeLink: 'https://shopee.vn/hoodie-001',
        tiktokLink: 'https://shop.tiktok.com/hoodie-001',
        category: 'tops'
      }
    ],
    tags: ['streetwear', 'urban', 'casual'],
    style: 'Streetwear',
    createdAt: new Date().toISOString(),
    createdBy: 'admin',
    isHot: true,
    isSponsored: false,
    isTrending: false,
    views: 234,
    clicks: 45
  },
  {
    id: '2',
    title: 'Vintage Romance',
    description: 'Timeless vintage pieces with romantic feminine touches',
    images: [
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400'
    ],
    items: [
      {
        id: 'dress-001',
        name: 'Floral Midi Dress',
        brand: 'VintageRose',
        price: '$120',
        shopeeLink: 'https://shopee.vn/dress-001',
        tiktokLink: 'https://shop.tiktok.com/dress-001',
        category: 'dresses'
      }
    ],
    tags: ['vintage', 'romantic', 'feminine'],
    style: 'Vintage',
    createdAt: new Date().toISOString(),
    createdBy: 'admin',
    isHot: false,
    isSponsored: true,
    isTrending: false,
    views: 156,
    clicks: 23
  }
];

export const useOutfits = () => {
  const [outfits, setOutfits] = useState<Outfit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [lastDoc, setLastDoc] = useState<DocumentSnapshot | null>(null);
  const [usingMockData, setUsingMockData] = useState(false);

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
      if (outfits.length === 0) {
        console.log('Using mock data as fallback');
        setOutfits(mockOutfits);
        setUsingMockData(true);
        setHasMore(false);
      }
      
      setError('Failed to load outfits from database, using sample data');
    } finally {
      setLoading(false);
    }
  };

  const loadMore = async () => {
    if (!loading && hasMore && !usingMockData) {
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
