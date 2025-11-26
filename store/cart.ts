import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { CartItem, Product } from '@/types/product';
import { getPriceForQuantity, getTotalPrice } from '@/data/products';

interface CartStore {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getSubtotal: () => number;
  getItemPrice: (item: CartItem) => number; // 获取单个商品的总价（使用批量价格）
  getItemUnitPrice: (item: CartItem) => number; // 获取单个商品的单价（使用批量价格）
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product, quantity = 1) => {
        const items = get().items;
        const existingItem = items.find((item) => item.product.id === product.id);
        
        if (existingItem) {
          set({
            items: items.map((item) =>
              item.product.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            ),
          });
        } else {
          set({
            items: [...items, { product, quantity }],
          });
        }
      },
      removeItem: (productId) => {
        set({
          items: get().items.filter((item) => item.product.id !== productId),
        });
      },
      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }
        set({
          items: get().items.map((item) =>
            item.product.id === productId ? { ...item, quantity } : item
          ),
        });
      },
      clearCart: () => {
        set({ items: [] });
      },
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },
      getSubtotal: () => {
        return get().items.reduce(
          (total, item) => total + getTotalPrice(item.product, item.quantity),
          0
        );
      },
      getItemPrice: (item: CartItem) => {
        return getTotalPrice(item.product, item.quantity);
      },
      getItemUnitPrice: (item: CartItem) => {
        return getPriceForQuantity(item.product, item.quantity);
      },
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

