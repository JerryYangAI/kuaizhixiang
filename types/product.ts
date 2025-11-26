export type UsageCategory = 'moving' | 'ecommerce' | 'storage' | 'wine';

// 批量价格层级
export interface PriceTier {
  minQuantity: number; // 最小数量
  maxQuantity?: number; // 最大数量（可选，undefined表示无上限）
  price: number; // 该层级的单价（JPY）
}

export interface Product {
  id: string;
  slug: string;
  name: {
    zh: string;
    ja: string;
    en: string;
  };
  description: {
    zh: string;
    ja: string;
    en: string;
  };
  sizeCode: number; // 60, 80, 100, 120, etc.
  dimensions: {
    length: number; // cm
    width: number; // cm
    height: number; // cm
  };
  weightCapacity: number; // kg
  thickness: number; // mm
  hasHandHoles: boolean;
  usageCategories: UsageCategory[];
  price: number; // JPY (基础价格，用于向后兼容)
  priceTiers: PriceTier[]; // 批量价格层级
  minOrderQuantity: number; // 最小起订量，默认1000
  maxOrderQuantity: number; // 最大起订量，默认100000
  isHot: boolean;
  isNew: boolean;
  mainImage: string;
  galleryImages: string[];
  material: string;
  suitableFor?: string; // e.g., "宅急便 100 size"
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface ShippingInfo {
  name: string;
  phone: string;
  email: string;
  postcode: string;
  prefecture: string;
  city: string;
  street: string;
  building?: string;
  notes?: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  shippingInfo: ShippingInfo;
  deliveryOption: 'standard' | 'express';
  paymentMethod: 'stripe' | 'alipay';
  subtotal: number;
  shipping: number;
  total: number;
  createdAt: Date;
}

