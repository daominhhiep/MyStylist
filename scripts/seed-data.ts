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
      }
    ],
    tags: ['vintage', 'romantic', 'feminine'],
    style: 'Vintage',
    createdAt: new Date().toISOString(),
    createdBy: 'admin',
    isHot: false,
    isSponsored: true,
    isTrending: false
  }
];

export const seedOutfits = async () => {
  try {
    console.log('Starting outfit seeding...');

    for (const outfitData of sampleOutfits) {
      try {
        const outfitId = await createOutfit(outfitData);
        console.log(`Created outfit: ${outfitData.title} with ID: ${outfitId}`);
      } catch (error) {
        console.error(`Error creating outfit ${outfitData.title}:`, error);
      }
    }

    console.log('Outfit seeding completed!');
  } catch (error) {
    console.error('Error during seeding:', error);
  }
};

if (require.main === module) {
  seedOutfits();
}