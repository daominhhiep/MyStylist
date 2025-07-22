import { createItem, createOutfit } from '../lib/firestore';
import { items_mock, outfits_mock } from '../mock/data';

export const seedOutfits = async () => {
  try {
    console.log('Starting outfit seeding...');

    for (const outfitData of outfits_mock) {
      try {
        const outfitId = await createOutfit(outfitData);
        console.log(`Created outfit: ${outfitData.title} with ID: ${outfitId}`);
      } catch (error) {
        console.error(`Error creating outfit ${outfitData.title}:`, error);
      }
    }

    for (const itemData of items_mock) {
      try {
        const itemId = await createItem(itemData);
        console.log(`Created outfit: ${itemData.name} with ID: ${itemId}`);
      } catch (error) {
        console.error(`Error creating outfit ${itemData.name}:`, error);
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