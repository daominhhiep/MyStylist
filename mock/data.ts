export interface MockOutfitItem {
  id: string;
  name: string;
  brand: string;
  price: string;
  originalPrice?: string;
  shopeeLink?: string;
  tiktokLink?: string;
  category: string;
  description?: string;
  rating?: number;
  reviews?: number;
  sizes?: string[];
  colors?: { name: string; label: string; color: string }[];
  features?: string[];
  tags?: string[];
}

export interface MockOutfit {
  id: string;
  title: string;
  name?: string; // Add name field for compatibility
  description: string;
  images: string[];
  items: MockOutfitItem[];
  tags: string[];
  style: string;
  createdAt: string;
  createdBy: string;
  isHot?: boolean;
  isSponsored?: boolean;
  isTrending?: boolean;
  views?: number;
  clicks?: number;
  rating?: number;
  reviews?: number;
  modelSpecs?: {
    height: string;
    weight: string;
    chest: string;
    waist: string;
    hips: string;
    size: string;
  };
}

// Mock Items Data
export const items_mock: MockOutfitItem[] = [
  {
    id: 'hoodie-001',
    name: 'Oversized Hoodie',
    brand: 'UrbanStyle',
    price: '$65',
    originalPrice: '$85',
    category: 'tops',
    description: 'Comfortable oversized hoodie perfect for streetwear looks',
    rating: 4.8,
    reviews: 234,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'black', label: 'Black', color: '#000000' },
      { name: 'gray', label: 'Gray', color: '#808080' },
      { name: 'white', label: 'White', color: '#FFFFFF' }
    ],
    shopeeLink: 'https://shopee.vn/hoodie-001',
    tiktokLink: 'https://shop.tiktok.com/hoodie-001',
    tags: ['streetwear', 'casual', 'oversized']
  },
  {
    id: 'jeans-001',
    name: 'Distressed Jeans',
    brand: 'StreetDenim',
    price: '$89',
    originalPrice: '$120',
    category: 'bottoms',
    description: 'Trendy distressed jeans with vintage wash',
    rating: 4.6,
    reviews: 156,
    sizes: ['26', '28', '30', '32', '34'],
    colors: [
      { name: 'blue', label: 'Light Blue', color: '#4169E1' },
      { name: 'dark', label: 'Dark Blue', color: '#1e3a8a' }
    ],
    shopeeLink: 'https://shopee.vn/jeans-001',
    tiktokLink: 'https://shop.tiktok.com/jeans-001',
    tags: ['denim', 'vintage', 'distressed']
  },
  {
    id: 'dress-001',
    name: 'Floral Midi Dress',
    brand: 'VintageRose',
    price: '$120',
    originalPrice: '$160',
    category: 'dresses',
    description: 'Elegant floral midi dress with vintage-inspired design',
    rating: 4.9,
    reviews: 89,
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'floral', label: 'Pink Floral', color: '#FFB6C1' },
      { name: 'blue', label: 'Blue Floral', color: '#87CEEB' }
    ],
    shopeeLink: 'https://shopee.vn/dress-001',
    tiktokLink: 'https://shop.tiktok.com/dress-001',
    tags: ['vintage', 'feminine', 'elegant']
  },
  {
    id: 'jacket-001',
    name: 'Denim Jacket',
    brand: 'Urban Style',
    price: '$45',
    originalPrice: '$65',
    category: 'outerwear',
    description: 'Classic denim jacket with vintage wash',
    rating: 4.6,
    reviews: 89,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'blue', label: 'Light Blue', color: '#4169E1' },
      { name: 'dark', label: 'Dark Blue', color: '#1e3a8a' },
      { name: 'black', label: 'Black', color: '#000000' }
    ],
    shopeeLink: 'https://shopee.vn/jacket-123',
    tiktokLink: 'https://shop.tiktok.com/jacket-123',
    tags: ['denim', 'vintage', 'casual', 'unisex']
  },
  {
    id: 'tshirt-001',
    name: 'Basic White Tee',
    brand: 'BasicWear',
    price: '$15',
    originalPrice: '$25',
    category: 'tops',
    description: 'Essential white t-shirt for any wardrobe',
    rating: 4.7,
    reviews: 312,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'white', label: 'White', color: '#FFFFFF' },
      { name: 'black', label: 'Black', color: '#000000' },
      { name: 'gray', label: 'Gray', color: '#808080' }
    ],
    shopeeLink: 'https://shopee.vn/tshirt-456',
    tiktokLink: 'https://shop.tiktok.com/tshirt-456',
    tags: ['basic', 'essential', 'casual']
  },
  {
    id: 'sneakers-001',
    name: 'White Sneakers',
    brand: 'ComfortStep',
    price: '$75',
    originalPrice: '$95',
    category: 'shoes',
    description: 'Classic white sneakers for everyday wear',
    rating: 4.8,
    reviews: 201,
    sizes: ['36', '37', '38', '39', '40', '41', '42'],
    colors: [
      { name: 'white', label: 'White', color: '#FFFFFF' },
      { name: 'cream', label: 'Cream', color: '#F5F5DC' }
    ],
    shopeeLink: 'https://shopee.vn/sneakers-001',
    tiktokLink: 'https://shop.tiktok.com/sneakers-001',
    tags: ['sneakers', 'casual', 'comfortable']
  },
  {
    id: 'blouse-001',
    name: 'Silk Blouse',
    brand: 'ElegantStyle',
    price: '$95',
    originalPrice: '$125',
    category: 'tops',
    description: 'Luxurious silk blouse for professional looks',
    rating: 4.9,
    reviews: 67,
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'ivory', label: 'Ivory', color: '#FFFFF0' },
      { name: 'navy', label: 'Navy', color: '#000080' },
      { name: 'blush', label: 'Blush', color: '#FFB6C1' }
    ],
    shopeeLink: 'https://shopee.vn/blouse-001',
    tiktokLink: 'https://shop.tiktok.com/blouse-001',
    tags: ['silk', 'elegant', 'professional']
  },
  {
    id: 'skirt-001',
    name: 'Pleated Mini Skirt',
    brand: 'TrendyWear',
    price: '$35',
    originalPrice: '$50',
    category: 'bottoms',
    description: 'Cute pleated mini skirt perfect for casual outings',
    rating: 4.5,
    reviews: 143,
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'black', label: 'Black', color: '#000000' },
      { name: 'navy', label: 'Navy', color: '#000080' },
      { name: 'plaid', label: 'Plaid', color: '#8B4513' }
    ],
    shopeeLink: 'https://shopee.vn/skirt-001',
    tiktokLink: 'https://shop.tiktok.com/skirt-001',
    tags: ['mini', 'pleated', 'cute']
  },
  {
    id: 'coat-001',
    name: 'Long Wool Coat',
    brand: 'WinterWarm',
    price: '$180',
    originalPrice: '$220',
    category: 'outerwear',
    description: 'Elegant long wool coat for cold weather',
    rating: 4.8,
    reviews: 92,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'camel', label: 'Camel', color: '#C19A6B' },
      { name: 'black', label: 'Black', color: '#000000' },
      { name: 'gray', label: 'Gray', color: '#808080' }
    ],
    shopeeLink: 'https://shopee.vn/coat-001',
    tiktokLink: 'https://shop.tiktok.com/coat-001',
    tags: ['wool', 'elegant', 'winter']
  },
  {
    id: 'pants-001',
    name: 'Wide Leg Trousers',
    brand: 'ModernFit',
    price: '$68',
    originalPrice: '$85',
    category: 'bottoms',
    description: 'Comfortable wide leg trousers for modern style',
    rating: 4.7,
    reviews: 178,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'black', label: 'Black', color: '#000000' },
      { name: 'beige', label: 'Beige', color: '#F5F5DC' },
      { name: 'navy', label: 'Navy', color: '#000080' }
    ],
    shopeeLink: 'https://shopee.vn/pants-001',
    tiktokLink: 'https://shop.tiktok.com/pants-001',
    tags: ['wide-leg', 'comfortable', 'modern']
  },
  {
    id: 'cardigan-001',
    name: 'Knit Cardigan',
    brand: 'CozyKnits',
    price: '$55',
    originalPrice: '$75',
    category: 'tops',
    description: 'Soft knit cardigan perfect for layering',
    rating: 4.6,
    reviews: 134,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'cream', label: 'Cream', color: '#F5F5DC' },
      { name: 'pink', label: 'Dusty Pink', color: '#D8BFD8' },
      { name: 'gray', label: 'Gray', color: '#808080' }
    ],
    shopeeLink: 'https://shopee.vn/cardigan-001',
    tiktokLink: 'https://shop.tiktok.com/cardigan-001',
    tags: ['knit', 'cozy', 'layering']
  },
  {
    id: 'boots-001',
    name: 'Ankle Boots',
    brand: 'BootCraft',
    price: '$120',
    originalPrice: '$150',
    category: 'shoes',
    description: 'Stylish ankle boots with block heel',
    rating: 4.8,
    reviews: 98,
    sizes: ['36', '37', '38', '39', '40', '41'],
    colors: [
      { name: 'black', label: 'Black', color: '#000000' },
      { name: 'brown', label: 'Brown', color: '#8B4513' },
      { name: 'tan', label: 'Tan', color: '#D2B48C' }
    ],
    shopeeLink: 'https://shopee.vn/boots-001',
    tiktokLink: 'https://shop.tiktok.com/boots-001',
    tags: ['boots', 'ankle', 'heel']
  },
  {
    id: 'bag-001',
    name: 'Leather Handbag',
    brand: 'LuxeBags',
    price: '$145',
    originalPrice: '$180',
    category: 'accessories',
    description: 'Premium leather handbag with classic design',
    rating: 4.9,
    reviews: 76,
    colors: [
      { name: 'black', label: 'Black', color: '#000000' },
      { name: 'brown', label: 'Cognac', color: '#8B4513' },
      { name: 'beige', label: 'Nude', color: '#F5F5DC' }
    ],
    shopeeLink: 'https://shopee.vn/bag-001',
    tiktokLink: 'https://shop.tiktok.com/bag-001',
    tags: ['leather', 'handbag', 'luxury']
  },
  {
    id: 'sweater-001',
    name: 'Turtleneck Sweater',
    brand: 'WarmWear',
    price: '$65',
    originalPrice: '$85',
    category: 'tops',
    description: 'Classic turtleneck sweater in soft wool blend',
    rating: 4.7,
    reviews: 156,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'black', label: 'Black', color: '#000000' },
      { name: 'white', label: 'Cream', color: '#F5F5DC' },
      { name: 'burgundy', label: 'Burgundy', color: '#800020' }
    ],
    shopeeLink: 'https://shopee.vn/sweater-001',
    tiktokLink: 'https://shop.tiktok.com/sweater-001',
    tags: ['turtleneck', 'wool', 'classic']
  },
  {
    id: 'jumpsuit-001',
    name: 'Denim Jumpsuit',
    brand: 'RetroStyle',
    price: '$85',
    originalPrice: '$110',
    category: 'dresses',
    description: 'Vintage-inspired denim jumpsuit with modern fit',
    rating: 4.6,
    reviews: 89,
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'blue', label: 'Classic Blue', color: '#4169E1' },
      { name: 'black', label: 'Black Denim', color: '#2F2F2F' }
    ],
    shopeeLink: 'https://shopee.vn/jumpsuit-001',
    tiktokLink: 'https://shop.tiktok.com/jumpsuit-001',
    tags: ['jumpsuit', 'denim', 'vintage']
  },
  {
    id: 'blazer-001',
    name: 'Tailored Blazer',
    brand: 'BusinessChic',
    price: '$125',
    originalPrice: '$165',
    category: 'outerwear',
    description: 'Sharp tailored blazer for professional looks',
    rating: 4.8,
    reviews: 112,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'black', label: 'Black', color: '#000000' },
      { name: 'navy', label: 'Navy', color: '#000080' },
      { name: 'gray', label: 'Charcoal', color: '#36454F' }
    ],
    shopeeLink: 'https://shopee.vn/blazer-001',
    tiktokLink: 'https://shop.tiktok.com/blazer-001',
    tags: ['blazer', 'professional', 'tailored']
  },
  {
    id: 'sandals-001',
    name: 'Strappy Sandals',
    brand: 'SummerStep',
    price: '$45',
    originalPrice: '$65',
    category: 'shoes',
    description: 'Elegant strappy sandals perfect for summer',
    rating: 4.5,
    reviews: 167,
    sizes: ['36', '37', '38', '39', '40', '41'],
    colors: [
      { name: 'nude', label: 'Nude', color: '#F5DEB3' },
      { name: 'black', label: 'Black', color: '#000000' },
      { name: 'tan', label: 'Tan', color: '#D2B48C' }
    ],
    shopeeLink: 'https://shopee.vn/sandals-001',
    tiktokLink: 'https://shop.tiktok.com/sandals-001',
    tags: ['sandals', 'summer', 'strappy']
  },
  {
    id: 'shorts-001',
    name: 'High Waist Shorts',
    brand: 'SummerVibes',
    price: '$35',
    originalPrice: '$50',
    category: 'bottoms',
    description: 'Trendy high waist shorts for summer styling',
    rating: 4.4,
    reviews: 203,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'denim', label: 'Light Denim', color: '#6495ED' },
      { name: 'black', label: 'Black', color: '#000000' },
      { name: 'white', label: 'White', color: '#FFFFFF' }
    ],
    shopeeLink: 'https://shopee.vn/shorts-001',
    tiktokLink: 'https://shop.tiktok.com/shorts-001',
    tags: ['shorts', 'high-waist', 'summer']
  },
  {
    id: 'watch-001',
    name: 'Minimalist Watch',
    brand: 'TimeElegant',
    price: '$85',
    originalPrice: '$120',
    category: 'accessories',
    description: 'Sleek minimalist watch with leather strap',
    rating: 4.7,
    reviews: 143,
    colors: [
      { name: 'gold', label: 'Rose Gold', color: '#E8B4B8' },
      { name: 'silver', label: 'Silver', color: '#C0C0C0' },
      { name: 'black', label: 'Black', color: '#000000' }
    ],
    shopeeLink: 'https://shopee.vn/watch-001',
    tiktokLink: 'https://shop.tiktok.com/watch-001',
    tags: ['watch', 'minimalist', 'accessories']
  },
  {
    id: 'scarf-001',
    name: 'Silk Scarf',
    brand: 'LuxeAccessories',
    price: '$35',
    originalPrice: '$55',
    category: 'accessories',
    description: 'Elegant silk scarf with floral pattern',
    rating: 4.6,
    reviews: 89,
    colors: [
      { name: 'floral', label: 'Pink Floral', color: '#FFB6C1' },
      { name: 'blue', label: 'Blue Pattern', color: '#87CEEB' },
      { name: 'gold', label: 'Gold Print', color: '#FFD700' }
    ],
    shopeeLink: 'https://shopee.vn/scarf-001',
    tiktokLink: 'https://shop.tiktok.com/scarf-001',
    tags: ['scarf', 'silk', 'accessories']
  }
];

// Mock Outfits Data
export const outfits_mock: MockOutfit[] = [
  {
    id: '1',
    title: 'Urban Streetwear Vibe',
    name: 'Urban Streetwear Vibe',
    description: 'Bold and edgy streetwear look perfect for city adventures',
    images: [
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400',
      'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400'
    ],
    items: [
      items_mock.find(item => item.id === 'hoodie-001')!,
      items_mock.find(item => item.id === 'jeans-001')!,
      items_mock.find(item => item.id === 'sneakers-001')!
    ],
    tags: ['streetwear', 'urban', 'casual'],
    style: 'Streetwear',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    createdBy: 'admin',
    isHot: true,
    isSponsored: false,
    isTrending: false,
    views: 234,
    clicks: 45,
    rating: 4.8,
    reviews: 156,
    modelSpecs: {
      height: '175cm',
      weight: '65kg',
      chest: '90cm',
      waist: '75cm',
      hips: '95cm',
      size: 'M'
    }
  },
  {
    id: '2',
    title: 'Vintage Romance',
    name: 'Vintage Romance',
    description: 'Timeless vintage pieces with romantic feminine touches',
    images: [
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1583743814966-8936f37f147a?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1494790108755-2616c27ce725?w=400&h=600&fit=crop'
    ],
    items: [
      items_mock.find(item => item.id === 'dress-001')!,
      items_mock.find(item => item.id === 'cardigan-001')!,
      items_mock.find(item => item.id === 'boots-001')!
    ],
    tags: ['vintage', 'romantic', 'feminine'],
    style: 'Vintage',
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    createdBy: 'admin',
    isHot: false,
    isSponsored: true,
    isTrending: false,
    views: 189,
    clicks: 32,
    rating: 4.6,
    reviews: 89,
    modelSpecs: {
      height: '168cm',
      weight: '58kg',
      chest: '85cm',
      waist: '68cm',
      hips: '92cm',
      size: 'S'
    }
  },
  {
    id: '3',
    title: 'Clean Girl Aesthetic',
    name: 'Clean Girl Aesthetic',
    description: 'Minimalist and effortless clean girl style',
    images: [
      'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1544957992-20514f595d6f?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&h=600&fit=crop'
    ],
    items: [
      items_mock.find(item => item.id === 'tshirt-001')!,
      items_mock.find(item => item.id === 'pants-001')!,
      items_mock.find(item => item.id === 'sneakers-001')!
    ],
    tags: ['clean', 'minimal', 'effortless'],
    style: 'Clean',
    createdAt: new Date(Date.now() - 259200000).toISOString(),
    createdBy: 'admin',
    isHot: false,
    isSponsored: false,
    isTrending: true,
    views: 156,
    clicks: 28,
    rating: 4.7,
    reviews: 124,
    modelSpecs: {
      height: '172cm',
      weight: '62kg',
      chest: '88cm',
      waist: '72cm',
      hips: '94cm',
      size: 'M'
    }
  },
  {
    id: '4',
    title: 'Professional Power',
    description: 'Sophisticated business attire for confident professionals',
    images: [
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400',
      'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400'
    ],
    items: [
      items_mock.find(item => item.id === 'blazer-001')!,
      items_mock.find(item => item.id === 'blouse-001')!,
      items_mock.find(item => item.id === 'pants-001')!,
      items_mock.find(item => item.id === 'bag-001')!
    ],
    tags: ['professional', 'business', 'sophisticated'],
    style: 'Business',
    createdAt: new Date(Date.now() - 345600000).toISOString(),
    createdBy: 'admin',
    isHot: false,
    isSponsored: true,
    isTrending: false,
    views: 98,
    clicks: 19
  },
  {
    id: '5',
    title: 'Summer Breeze',
    description: 'Light and airy summer outfit perfect for warm days',
    images: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400',
      'https://images.unsplash.com/photo-1544957992-20d52e174b5b?w=400'
    ],
    items: [
      items_mock.find(item => item.id === 'tshirt-001')!,
      items_mock.find(item => item.id === 'shorts-001')!,
      items_mock.find(item => item.id === 'sandals-001')!,
      items_mock.find(item => item.id === 'scarf-001')!
    ],
    tags: ['summer', 'casual', 'light'],
    style: 'Casual',
    createdAt: new Date(Date.now() - 432000000).toISOString(),
    createdBy: 'admin',
    isHot: true,
    isSponsored: false,
    isTrending: true,
    views: 267,
    clicks: 54
  },
  {
    id: '6',
    title: 'Cozy Autumn',
    description: 'Warm and comfortable autumn layering',
    images: [
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=400',
      'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400'
    ],
    items: [
      items_mock.find(item => item.id === 'sweater-001')!,
      items_mock.find(item => item.id === 'jeans-001')!,
      items_mock.find(item => item.id === 'boots-001')!,
      items_mock.find(item => item.id === 'scarf-001')!
    ],
    tags: ['autumn', 'cozy', 'layering'],
    style: 'Casual',
    createdAt: new Date(Date.now() - 518400000).toISOString(),
    createdBy: 'admin',
    isHot: false,
    isSponsored: false,
    isTrending: false,
    views: 143,
    clicks: 26
  },
  {
    id: '7',
    title: 'Retro Denim Love',
    description: 'Classic denim pieces with retro styling',
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
      'https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=400'
    ],
    items: [
      items_mock.find(item => item.id === 'jacket-001')!,
      items_mock.find(item => item.id === 'tshirt-001')!,
      items_mock.find(item => item.id === 'jeans-001')!,
      items_mock.find(item => item.id === 'sneakers-001')!
    ],
    tags: ['denim', 'retro', 'classic'],
    style: 'Vintage',
    createdAt: new Date(Date.now() - 604800000).toISOString(),
    createdBy: 'admin',
    isHot: true,
    isSponsored: false,
    isTrending: false,
    views: 198,
    clicks: 38
  },
  {
    id: '8',
    title: 'Elegant Evening',
    description: 'Sophisticated evening wear for special occasions',
    images: [
      'https://images.unsplash.com/photo-1594736797933-d0bf2821c919?w=400',
      'https://images.unsplash.com/photo-1566479179817-1bb05e8b6e69?w=400'
    ],
    items: [
      items_mock.find(item => item.id === 'dress-001')!,
      items_mock.find(item => item.id === 'boots-001')!,
      items_mock.find(item => item.id === 'bag-001')!,
      items_mock.find(item => item.id === 'watch-001')!
    ],
    tags: ['elegant', 'evening', 'sophisticated'],
    style: 'Formal',
    createdAt: new Date(Date.now() - 691200000).toISOString(),
    createdBy: 'admin',
    isHot: false,
    isSponsored: true,
    isTrending: false,
    views: 112,
    clicks: 22
  },
  {
    id: '9',
    title: 'Boho Chic',
    description: 'Free-spirited bohemian style with modern touches',
    images: [
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=400',
      'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=400'
    ],
    items: [
      items_mock```text
.find(item => item.id === 'dress-001')!,
      items_mock.find(item => item.id === 'cardigan-001')!,
      items_mock.find(item => item.id === 'sandals-001')!,
      items_mock.find(item => item.id === 'scarf-001')!
    ],
    tags: ['boho', 'free-spirited', 'artistic'],
    style: 'Boho',
    createdAt: new Date(Date.now() - 777600000).toISOString(),
    createdBy: 'admin',
    isHot: false,
    isSponsored: false,
    isTrending: true,
    views: 176,
    clicks: 31
  },
  {
    id: '10',
    title: 'Weekend Casual',
    description: 'Comfortable and stylish weekend outfit',
    images: [
      'https://images.unsplash.com/photo-1506629905061-6a3c6d5c99f0?w=400',
      'https://images.unsplash.com/photo-1523381140794-a1eef18a37c7?w=400'
    ],
    items: [
      items_mock.find(item => item.id === 'hoodie-001')!,
      items_mock.find(item => item.id === 'shorts-001')!,
      items_mock.find(item => item.id === 'sneakers-001')!,
      items_mock.find(item => item.id === 'watch-001')!
    ],
    tags: ['weekend', 'casual', 'comfortable'],
    style: 'Casual',
    createdAt: new Date(Date.now() - 864000000).toISOString(),
    createdBy: 'admin',
    isHot: true,
    isSponsored: false,
    isTrending: false,
    views: 223,
    clicks: 47
  },
  {
    id: '11',
    title: 'Minimalist Chic',
    description: 'Clean lines and neutral colors for effortless style',
    images: [
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=600&fit=crop'
    ],
    items: [
      items_mock.find(item => item.id === 'tshirt-001')!,
      items_mock.find(item => item.id === 'pants-001')!,
      items_mock.find(item => item.id === 'sneakers-001')!,
      items_mock.find(item => item.id === 'bag-001')!
    ],
    tags: ['minimalist', 'clean', 'neutral'],
    style: 'Clean',
    createdAt: new Date(Date.now() - 950400000).toISOString(),
    createdBy: 'admin',
    isHot: false,
    isSponsored: false,
    isTrending: true,
    views: 187,
    clicks: 34
  },
  {
    id: '12',
    title: 'Winter Elegance',
    description: 'Sophisticated winter styling with warm layers',
    images: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400',
      'https://images.unsplash.com/photo-1544957992-20d52e174b5b?w=400'
    ],
    items: [
      items_mock.find(item => item.id === 'coat-001')!,
      items_mock.find(item => item.id === 'sweater-001')!,
      items_mock.find(item => item.id === 'pants-001')!,
      items_mock.find(item => item.id === 'boots-001')!
    ],
    tags: ['winter', 'elegant', 'warm'],
    style: 'Formal',
    createdAt: new Date(Date.now() - 1036800000).toISOString(),
    createdBy: 'admin',
    isHot: false,
    isSponsored: true,
    isTrending: false,
    views: 134,
    clicks: 25
  },
  {
    id: '13',
    title: 'Sporty Chic',
    description: 'Athletic-inspired look with street style edge',
    images: [
      'https://images.unsplash.com/photo-1506629905061-6a3c6d5c99f0?w=400',
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400'
    ],
    items: [
      items_mock.find(item => item.id === 'hoodie-001')!,
      items_mock.find(item => item.id === 'shorts-001')!,
      items_mock.find(item => item.id === 'sneakers-001')!,
      items_mock.find(item => item.id === 'watch-001')!
    ],
    tags: ['sporty', 'athletic', 'street'],
    style: 'Sporty',
    createdAt: new Date(Date.now() - 1123200000).toISOString(),
    createdBy: 'admin',
    isHot: true,
    isSponsored: false,
    isTrending: true,
    views: 298,
    clicks: 62
  },
  {
    id: '14',
    title: 'Parisian Romance',
    description: 'French-inspired romantic styling with timeless pieces',
    images: [
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400',
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=400'
    ],
    items: [
      items_mock.find(item => item.id === 'blouse-001')!,
      items_mock.find(item => item.id === 'skirt-001')!,
      items_mock.find(item => item.id === 'boots-001')!,
      items_mock.find(item => item.id === 'scarf-001')!
    ],
    tags: ['parisian', 'romantic', 'timeless'],
    style: 'Vintage',
    createdAt: new Date(Date.now() - 1209600000).toISOString(),
    createdBy: 'admin',
    isHot: false,
    isSponsored: false,
    isTrending: false,
    views: 165,
    clicks: 29
  },
  {
    id: '15',
    title: 'Modern Workwear',
    description: 'Contemporary professional attire for the modern workplace',
    images: [
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400',
      'https://images.unsplash.com/photo-1594736797933-d0bf2821c919?w=400'
    ],
    items: [
      items_mock.find(item => item.id === 'blazer-001')!,
      items_mock.find(item => item.id === 'tshirt-001')!,
      items_mock.find(item => item.id === 'pants-001')!,
      items_mock.find(item => item.id === 'bag-001')!
    ],
    tags: ['modern', 'work', 'professional'],
    style: 'Business',
    createdAt: new Date(Date.now() - 1296000000).toISOString(),
    createdBy: 'admin',
    isHot: false,
    isSponsored: true,
    isTrending: false,
    views: 119,
    clicks: 21
  },
  {
    id: '16',
    title: 'Festival Ready',
    description: 'Fun and colorful outfit perfect for music festivals',
    images: [
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=400',
      'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=400'
    ],
    items: [
      items_mock.find(item => item.id === 'jumpsuit-001')!,
      items_mock.find(item => item.id === 'sandals-001')!,
      items_mock.find(item => item.id === 'scarf-001')!,
      items_mock.find(item => item.id === 'watch-001')!
    ],
    tags: ['festival', 'fun', 'colorful'],
    style: 'Boho',
    createdAt: new Date(Date.now() - 1382400000).toISOString(),
    createdBy: 'admin',
    isHot: true,
    isSponsored: false,
    isTrending: true,
    views: 245,
    clicks: 52
  },
  {
    id: '17',
    title: 'Classic Casual',
    description: 'Timeless casual pieces that never go out of style',
    images: [
      'https://images.unsplash.com/photo-1506629905061-6a3c6d5c99f0?w=400',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400'
    ],
    items: [
      items_mock.find(item => item.id === 'jacket-001')!,
      items_mock.find(item => item.id === 'tshirt-001')!,
      items_mock.find(item => item.id === 'jeans-001')!,
      items_mock.find(item => item.id === 'sneakers-001')!
    ],
    tags: ['classic', 'casual', 'timeless'],
    style: 'Casual',
    createdAt: new Date(Date.now() - 1468800000).toISOString(),
    createdBy: 'admin',
    isHot: false,
    isSponsored: false,
    isTrending: false,
    views: 178,
    clicks: 33
  },
  {
    id: '18',
    title: 'Date Night Glam',
    description: 'Romantic and glamorous outfit perfect for date nights',
    images: [
      'https://images.unsplash.com/photo-1594736797933-d0bf2821c919?w=400',
      'https://images.unsplash.com/photo-1566479179817-1bb05e8b6e69?w=400'
    ],
    items: [
      items_mock.find(item => item.id === 'dress-001')!,
      items_mock.find(item => item.id === 'boots-001')!,
      items_mock.find(item => item.id === 'bag-001')!,
      items_mock.find(item => item.id === 'watch-001')!
    ],
    tags: ['date', 'romantic', 'glamorous'],
    style: 'Formal',
    createdAt: new Date(Date.now() - 1555200000).toISOString(),
    createdBy: 'admin',
    isHot: true,
    isSponsored: true,
    isTrending: false,
    views: 201,
    clicks: 41
  },
  {
    id: '19',
    title: 'Brunch Vibes',
    description: 'Relaxed yet stylish outfit perfect for weekend brunch',
    images: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400',
      'https://images.unsplash.com/photo-1544957992-20d52e174b5b?w=400'
    ],
    items: [
      items_mock.find(item => item.id === 'blouse-001')!,
      items_mock.find(item => item.id === 'shorts-001')!,
      items_mock.find(item => item.id === 'sandals-001')!,
      items_mock.find(item => item.id === 'bag-001')!
    ],
    tags: ['brunch', 'relaxed', 'weekend'],
    style: 'Casual',
    createdAt: new Date(Date.now() - 1641600000).toISOString(),
    createdBy: 'admin',
    isHot: false,
    isSponsored: false,
    isTrending: true,
    views: 156,
    clicks: 28
  },
  {
    id: '20',
    title: 'City Explorer',
    description: 'Comfortable and stylish outfit for urban exploration',
    images: [
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400',
      'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400'
    ],
    items: [
      items_mock.find(item => item.id === 'hoodie-001')!,
      items_mock.find(item => item.id === 'jeans-001')!,
      items_mock.find(item => item.id === 'sneakers-001')!,
      items_mock.find(item => item.id === 'bag-001')!
    ],
    tags: ['city', 'explorer', 'comfortable'],
    style: 'Streetwear',
    createdAt: new Date(Date.now() - 1728000000).toISOString(),
    createdBy: 'admin',
    isHot: false,
    isSponsored: false,
    isTrending: false,
    views: 189,
    clicks: 35
  },
  {
    id: '21',
    title: 'Office Chic',
    description: 'Sophisticated office wear with contemporary flair',
    images: [
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400',
      'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400'
    ],
    items: [
      items_mock.find(item => item.id === 'blazer-001')!,
      items_mock.find(item => item.id === 'blouse-001')!,
      items_mock.find(item => item.id === 'skirt-001')!,
      items_mock.find(item => item.id === 'boots-001')!
    ],
    tags: ['office', 'chic', 'sophisticated'],
    style: 'Business',
    createdAt: new Date(Date.now() - 1814400000).toISOString(),
    createdBy: 'admin',
    isHot: false,
    isSponsored: true,
    isTrending: false,
    views: 142,
    clicks: 26
  },
  {
    id: '22',
    title: 'Artsy Creative',
    description: 'Unique and creative styling for artistic personalities',
    images: [
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=400',
      'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=400'
    ],
    items: [
      items_mock.find(item => item.id === 'jumpsuit-001')!,
      items_mock.find(item => item.id === 'cardigan-001')!,
      items_mock.find(item => item.id === 'boots-001')!,
      items_mock.find(item => item.id === 'scarf-001')!
    ],
    tags: ['artsy', 'creative', 'unique'],
    style: 'Boho',
    createdAt: new Date(Date.now() - 1900800000).toISOString(),
    createdBy: 'admin',
    isHot: true,
    isSponsored: false,
    isTrending: true,
    views: 267,
    clicks: 58
  },
  {
    id: '23',
    title: 'Japan Style',
    description: 'Japan style with new trend',
    images: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1503342452485-86b7f54527bb?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1492288991661-058aa541ff43?w=400&h=600&fit=crop'
    ],
    items: [
      items_mock.find(item => item.id === 'jumpsuit-001')!,
      items_mock.find(item => item.id === 'cardigan-001')!,
      items_mock.find(item => item.id === 'boots-001')!,
      items_mock.find(item => item.id === 'scarf-001')!
    ],
    tags: ['artsy', 'creative', 'unique'],
    style: 'Boho',
    createdAt: new Date(Date.now() - 1900800000).toISOString(),
    createdBy: 'admin',
    isHot: true,
    isSponsored: false,
    isTrending: true,
    views: 267,
    clicks: 58
  }
];

// Helper function to get outfit by ID
export const getOutfitById = (id: string): MockOutfit | undefined => {
  return outfits_mock.find(outfit => outfit.id === id);
};

// Helper function to get outfits by style
export const getOutfitsByStyle = (style: string): MockOutfit[] => {
  return outfits_mock.filter(outfit => outfit.style.toLowerCase() === style.toLowerCase());
};