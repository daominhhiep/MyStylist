export const outfits_mock = [
  {
    id: 1,
    name: 'Oversized Hoodie Set',
    style: 'Streetwear',
    tags: ['hot'],
    affiliateLink: 'https://shope.ee/streetwear1'
  },
  {
    id: 2,
    name: 'Urban Denim Look',
    style: 'Streetwear',
    tags: ['trending'],
    affiliateLink: 'https://tiktok.com/shop/urban1'
  },
  {
    id: 3,
    name: 'Graphic Tee Combo',
    style: 'Streetwear',
    tags: ['casual'],
    affiliateLink: 'https://shope.ee/graphic1'
  },
  {id: 4, name: 'Minimalist Tee', style: 'Basic', tags: ['sponsored'], affiliateLink: 'https://shope.ee/basic1'},
  {
    id: 5,
    name: 'Classic Jeans Look',
    style: 'Basic',
    tags: ['timeless'],
    affiliateLink: 'https://tiktok.com/shop/classic1'
  },
  {
    id: 6,
    name: 'Retro Denim Jacket',
    style: 'Vintage',
    tags: ['trending'],
    affiliateLink: 'https://shope.ee/vintage1'
  },
  {id: 7, name: '90s Revival Set', style: 'Vintage', tags: ['hot'], affiliateLink: 'https://tiktok.com/shop/90s1'},
  {id: 8, name: 'Minimalist Outfit', style: 'Clean', tags: ['sponsored'], affiliateLink: 'https://shope.ee/clean1'},
  {id: 9, name: 'Monochrome Look', style: 'Clean', tags: ['elegant'], affiliateLink: 'https://tiktok.com/shop/mono1'},
  {id: 10, name: 'Business Suit', style: 'Formal', tags: ['professional'], affiliateLink: 'https://shope.ee/formal1'},
  {id: 11, name: 'Cocktail Dress', style: 'Formal', tags: ['hot'], affiliateLink: 'https://tiktok.com/shop/formal2'},
  {id: 12, name: 'Gym Ready', style: 'Sporty', tags: ['trending'], affiliateLink: 'https://shope.ee/gym1'}
];


export const item_mock = (id: string) => {
  return {
    id: id,
    name: 'Denim Jacket',
    brand: 'Urban Style',
    description: 'Classic denim jacket với thiết kế vintage, phù hợp cho mọi phong cách từ casual đến streetwear.',
    price: '$45',
    originalPrice: '$65',
    rating: 4.6,
    reviews: 89,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'default', label: 'Light Blue', color: '#4169E1' },
      { name: 'dark', label: 'Dark Blue', color: '#1e3a8a' },
      { name: 'black', label: 'Black', color: '#000000' }
    ],
    features: [
      'Chất liệu: 100% Cotton',
      'Thiết kế: Classic fit',
      'Xuất xứ: Vietnam',
      'Dễ dàng mix & match'
    ],
    shopeeLink: 'https://shopee.vn/jacket-123',
    tiktokLink: 'https://shop.tiktok.com/jacket-123',
    tags: ['denim', 'vintage', 'casual', 'unisex']
  }
};