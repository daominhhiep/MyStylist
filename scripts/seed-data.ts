
import { createOutfit } from '../lib/firestore';

const sampleOutfits = [
  {
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
      },
      {
        id: 'jeans-001',
        name: 'Distressed Jeans',
        brand: 'StreetDenim',
        price: '$89',
        shopeeLink: 'https://shopee.vn/jeans-001',
        tiktokLink: 'https://shop.tiktok.com/jeans-001',
        category: 'bottoms'
      }
    ],
    tags: ['streetwear', 'urban', 'casual'],
    style: 'Streetwear',
    createdAt: new Date().toISOString(),
    createdBy: 'admin',
    isHot: true,
    isSponsored: false,
    isTrending: false
  },
  {
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
      },
      {
        id: 'cardigan-001',
        name: 'Cropped Cardigan',
        brand: 'RetroChic',
        price: '$45',
        shopeeLink: 'https://shopee.vn/cardigan-001',
        tiktokLink: 'https://shop.tiktok.com/cardigan-001',
        category: 'tops'
      }
    ],
    tags: ['vintage', 'romantic', 'feminine'],
    style: 'Vintage',
    createdAt: new Date().toISOString(),
    createdBy: 'admin',
    isHot: false,
    isSponsored: true,
    isTrending: false
  },
  {
    title: 'Clean Girl Aesthetic',
    description: 'Minimal and effortless look for the modern woman',
    images: [
      'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400',
      'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=400'
    ],
    items: [
      {
        id: 'tshirt-001',
        name: 'Basic White Tee',
        brand: 'Minimalist',
        price: '$25',
        shopeeLink: 'https://shopee.vn/tshirt-001',
        tiktokLink: 'https://shop.tiktok.com/tshirt-001',
        category: 'tops'
      },
      {
        id: 'jeans-002',
        name: 'High-Waist Jeans',
        brand: 'CleanDenim',
        price: '$75',
        shopeeLink: 'https://shopee.vn/jeans-002',
        tiktokLink: 'https://shop.tiktok.com/jeans-002',
        category: 'bottoms'
      }
    ],
    tags: ['clean', 'minimal', 'effortless'],
    style: 'Clean Girl',
    createdAt: new Date().toISOString(),
    createdBy: 'admin',
    isHot: false,
    isSponsored: false,
    isTrending: true
  },
  {
    title: 'Tokyo Street Style',
    description: 'Kawaii and trendy Japanese street fashion inspiration',
    images: [
      'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400',
      'https://images.unsplash.com/photo-1605525042632-c7c0e4629d6c?w=400'
    ],
    items: [
      {
        id: 'skirt-001',
        name: 'Pleated Mini Skirt',
        brand: 'TokyoStyle',
        price: '$55',
        shopeeLink: 'https://shopee.vn/skirt-001',
        tiktokLink: 'https://shop.tiktok.com/skirt-001',
        category: 'bottoms'
      },
      {
        id: 'top-001',
        name: 'Kawaii Crop Top',
        brand: 'HarajukuFashion',
        price: '$35',
        shopeeLink: 'https://shopee.vn/top-001',
        tiktokLink: 'https://shop.tiktok.com/top-001',
        category: 'tops'
      }
    ],
    tags: ['japanese', 'kawaii', 'trendy'],
    style: 'Japan Style',
    createdAt: new Date().toISOString(),
    createdBy: 'admin',
    isHot: true,
    isSponsored: false,
    isTrending: true
  }
];

export const seedOutfits = async () => {
  console.log('Seeding outfit data...');
  
  for (const outfit of sampleOutfits) {
    try {
      const outfitId = await createOutfit(outfit);
      console.log(`Created outfit: ${outfit.title} with ID: ${outfitId}`);
    } catch (error) {
      console.error(`Error creating outfit ${outfit.title}:`, error);
    }
  }
  
  console.log('Finished seeding outfit data!');
};

// Run if called directly
if (require.main === module) {
  seedOutfits();
}
