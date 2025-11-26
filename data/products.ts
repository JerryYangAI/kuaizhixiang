import { Product, PriceTier } from '@/types/product';

// 批量价格计算函数
export function getPriceForQuantity(product: Product, quantity: number): number {
  // 如果没有价格层级，使用基础价格
  if (!product.priceTiers || product.priceTiers.length === 0) {
    return product.price;
  }
  
  // 找到匹配的价格层级
  for (const tier of product.priceTiers) {
    if (quantity >= tier.minQuantity) {
      if (tier.maxQuantity === undefined || quantity <= tier.maxQuantity) {
        return tier.price;
      }
    }
  }
  
  // 如果数量超过所有层级，返回最后一个层级的价格
  return product.priceTiers[product.priceTiers.length - 1].price;
}

// 计算总价
export function getTotalPrice(product: Product, quantity: number): number {
  const unitPrice = getPriceForQuantity(product, quantity);
  return unitPrice * quantity;
}

// TODO: Replace this with database queries later
// This structure makes it easy to migrate to Prisma or an external API
export const PRODUCTS: Product[] = [
  {
    id: '1',
    slug: 'takkyubin-60-standard',
    name: {
      zh: '宅急便60标准纸箱',
      ja: '宅急便60標準ダンボール',
      en: 'Takkyubin 60 Standard Box',
    },
    description: {
      zh: '适合小件物品的标准纸箱，可装约10-15本书或小型电子产品。',
      ja: '小物に適した標準ダンボール。約10-15冊の本や小型電子製品が入ります。',
      en: 'Standard box suitable for small items. Can hold about 10-15 books or small electronics.',
    },
    sizeCode: 60,
    dimensions: {
      length: 30,
      width: 25,
      height: 20,
    },
    weightCapacity: 10,
    thickness: 5,
    hasHandHoles: true,
    usageCategories: ['moving', 'ecommerce', 'storage'],
    price: 150,
    priceTiers: [
      { minQuantity: 1000, maxQuantity: 9999, price: 150 },
      { minQuantity: 10000, maxQuantity: 49999, price: 140 },
      { minQuantity: 50000, maxQuantity: 99999, price: 130 },
      { minQuantity: 100000, price: 120 },
    ],
    minOrderQuantity: 1000,
    maxOrderQuantity: 100000,
    isHot: true,
    isNew: false,
    mainImage: 'https://via.placeholder.com/400x400?text=Box+60',
    galleryImages: [
      'https://via.placeholder.com/400x400?text=Box+60+1',
      'https://via.placeholder.com/400x400?text=Box+60+2',
    ],
    material: 'Corrugated cardboard',
    suitableFor: '宅急便 60 size',
  },
  {
    id: '2',
    slug: 'takkyubin-80-standard',
    name: {
      zh: '宅急便80标准纸箱',
      ja: '宅急便80標準ダンボール',
      en: 'Takkyubin 80 Standard Box',
    },
    description: {
      zh: '中等尺寸纸箱，适合衣物、书籍等。可装约20-30本书。',
      ja: '中サイズのダンボール。衣類や書籍などに適しています。約20-30冊の本が入ります。',
      en: 'Medium-sized box suitable for clothing, books, etc. Can hold about 20-30 books.',
    },
    sizeCode: 80,
    dimensions: {
      length: 40,
      width: 30,
      height: 30,
    },
    weightCapacity: 15,
    thickness: 5,
    hasHandHoles: true,
    usageCategories: ['moving', 'ecommerce'],
    price: 200,
    priceTiers: [
      { minQuantity: 1000, maxQuantity: 9999, price: 200 },
      { minQuantity: 10000, maxQuantity: 49999, price: 190 },
      { minQuantity: 50000, maxQuantity: 99999, price: 180 },
      { minQuantity: 100000, price: 170 },
    ],
    minOrderQuantity: 1000,
    maxOrderQuantity: 100000,
    isHot: true,
    isNew: false,
    mainImage: 'https://via.placeholder.com/400x400?text=Box+80',
    galleryImages: [
      'https://via.placeholder.com/400x400?text=Box+80+1',
      'https://via.placeholder.com/400x400?text=Box+80+2',
    ],
    material: 'Corrugated cardboard',
    suitableFor: '宅急便 80 size',
  },
  {
    id: '3',
    slug: 'takkyubin-100-standard',
    name: {
      zh: '宅急便100标准纸箱',
      ja: '宅急便100標準ダンボール',
      en: 'Takkyubin 100 Standard Box',
    },
    description: {
      zh: '大尺寸纸箱，适合搬家、大件物品。可装约40-50本书或小型家电。',
      ja: '大型ダンボール。引越しや大型品に適しています。約40-50冊の本や小型家電が入ります。',
      en: 'Large box suitable for moving and large items. Can hold about 40-50 books or small appliances.',
    },
    sizeCode: 100,
    dimensions: {
      length: 50,
      width: 40,
      height: 40,
    },
    weightCapacity: 20,
    thickness: 5,
    hasHandHoles: true,
    usageCategories: ['moving', 'storage'],
    price: 280,
    priceTiers: [
      { minQuantity: 1000, maxQuantity: 9999, price: 280 },
      { minQuantity: 10000, maxQuantity: 49999, price: 270 },
      { minQuantity: 50000, maxQuantity: 99999, price: 260 },
      { minQuantity: 100000, price: 250 },
    ],
    minOrderQuantity: 1000,
    maxOrderQuantity: 100000,
    isHot: true,
    isNew: true,
    mainImage: 'https://via.placeholder.com/400x400?text=Box+100',
    galleryImages: [
      'https://via.placeholder.com/400x400?text=Box+100+1',
      'https://via.placeholder.com/400x400?text=Box+100+2',
    ],
    material: 'Corrugated cardboard',
    suitableFor: '宅急便 100 size',
  },
  {
    id: '4',
    slug: 'takkyubin-120-standard',
    name: {
      zh: '宅急便120标准纸箱',
      ja: '宅急便120標準ダンボール',
      en: 'Takkyubin 120 Standard Box',
    },
    description: {
      zh: '超大尺寸纸箱，适合大型搬家、家具包装。',
      ja: '超大型ダンボール。大型引越しや家具の梱包に適しています。',
      en: 'Extra-large box suitable for large moves and furniture packaging.',
    },
    sizeCode: 120,
    dimensions: {
      length: 60,
      width: 50,
      height: 50,
    },
    weightCapacity: 25,
    thickness: 5,
    hasHandHoles: true,
    usageCategories: ['moving'],
    price: 350,
    priceTiers: [
      { minQuantity: 1000, maxQuantity: 9999, price: 350 },
      { minQuantity: 10000, maxQuantity: 49999, price: 340 },
      { minQuantity: 50000, maxQuantity: 99999, price: 330 },
      { minQuantity: 100000, price: 320 },
    ],
    minOrderQuantity: 1000,
    maxOrderQuantity: 100000,
    isHot: false,
    isNew: false,
    mainImage: 'https://via.placeholder.com/400x400?text=Box+120',
    galleryImages: [
      'https://via.placeholder.com/400x400?text=Box+120+1',
      'https://via.placeholder.com/400x400?text=Box+120+2',
    ],
    material: 'Corrugated cardboard',
    suitableFor: '宅急便 120 size',
  },
  {
    id: '5',
    slug: 'wine-bottle-box-6pack',
    name: {
      zh: '6瓶装酒箱',
      ja: '6本入りワインボトル箱',
      en: '6-Bottle Wine Box',
    },
    description: {
      zh: '专为酒瓶设计的纸箱，可安全包装6瓶标准尺寸酒瓶。',
      ja: 'ワインボトル専用のダンボール。標準サイズのワインボトル6本を安全に梱包できます。',
      en: 'Box designed specifically for wine bottles. Can safely pack 6 standard-size wine bottles.',
    },
    sizeCode: 80,
    dimensions: {
      length: 40,
      width: 30,
      height: 35,
    },
    weightCapacity: 12,
    thickness: 5,
    hasHandHoles: true,
    usageCategories: ['wine'],
    price: 250,
    priceTiers: [
      { minQuantity: 1000, maxQuantity: 9999, price: 250 },
      { minQuantity: 10000, maxQuantity: 49999, price: 240 },
      { minQuantity: 50000, maxQuantity: 99999, price: 230 },
      { minQuantity: 100000, price: 220 },
    ],
    minOrderQuantity: 1000,
    maxOrderQuantity: 100000,
    isHot: false,
    isNew: true,
    mainImage: 'https://via.placeholder.com/400x400?text=Wine+Box',
    galleryImages: [
      'https://via.placeholder.com/400x400?text=Wine+Box+1',
    ],
    material: 'Corrugated cardboard with dividers',
    suitableFor: 'Fragile items',
  },
  {
    id: '6',
    slug: 'document-storage-box',
    name: {
      zh: '文件存储箱',
      ja: '書類保管用ダンボール',
      en: 'Document Storage Box',
    },
    description: {
      zh: '适合A4文件、档案存储的专用纸箱。',
      ja: 'A4書類やファイル保管に適した専用ダンボール。',
      en: 'Specialized box suitable for A4 documents and file storage.',
    },
    sizeCode: 60,
    dimensions: {
      length: 32,
      width: 23,
      height: 15,
    },
    weightCapacity: 8,
    thickness: 3,
    hasHandHoles: false,
    usageCategories: ['storage'],
    price: 120,
    priceTiers: [
      { minQuantity: 1000, maxQuantity: 9999, price: 120 },
      { minQuantity: 10000, maxQuantity: 49999, price: 115 },
      { minQuantity: 50000, maxQuantity: 99999, price: 110 },
      { minQuantity: 100000, price: 105 },
    ],
    minOrderQuantity: 1000,
    maxOrderQuantity: 100000,
    isHot: false,
    isNew: false,
    mainImage: 'https://via.placeholder.com/400x400?text=Doc+Box',
    galleryImages: [
      'https://via.placeholder.com/400x400?text=Doc+Box+1',
    ],
    material: 'Corrugated cardboard',
  },
];

// Helper functions for product queries
export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getProductsBySize(sizeCode: number): Product[] {
  return PRODUCTS.filter((p) => p.sizeCode === sizeCode);
}

export function getProductsByUsage(usage: string): Product[] {
  return PRODUCTS.filter((p) => p.usageCategories.includes(usage as any));
}

export function getHotProducts(): Product[] {
  return PRODUCTS.filter((p) => p.isHot);
}

export function searchProducts(query: string, locale: string = 'zh'): Product[] {
  const lowerQuery = query.toLowerCase();
  
  // Simple in-memory search
  // TODO: Replace with proper search service (e.g., Algolia, Elasticsearch)
  return PRODUCTS.filter((product) => {
    const name = product.name[locale as 'zh' | 'ja' | 'en']?.toLowerCase() || '';
    const description = product.description[locale as 'zh' | 'ja' | 'en']?.toLowerCase() || '';
    const dimensions = `${product.dimensions.length}×${product.dimensions.width}×${product.dimensions.height}`;
    
    // Search synonyms mapping
    const synonyms: Record<string, string[]> = {
      '搬家': ['moving', '引越し', '引越し用'],
      'moving': ['搬家', '引越し', '引越し用'],
      '引越し': ['moving', '搬家'],
      'storage': ['存储', '保管', '書類'],
      'wine': ['酒', 'ワイン', '酒瓶'],
      'ecommerce': ['电商', 'EC', '包装'],
    };
    
    const searchTerms = [lowerQuery];
    if (synonyms[lowerQuery]) {
      searchTerms.push(...synonyms[lowerQuery]);
    }
    
    return (
      name.includes(lowerQuery) ||
      description.includes(lowerQuery) ||
      dimensions.includes(lowerQuery) ||
      searchTerms.some(term => name.includes(term) || description.includes(term))
    );
  });
}

