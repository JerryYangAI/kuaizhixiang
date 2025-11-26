'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { useCartStore } from '@/store/cart';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const t = useTranslations('cart');
  const tCommon = useTranslations('common');
  const locale = useLocale();
  const router = useRouter();
  
  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const subtotal = useCartStore((state) => state.getSubtotal());
  const getItemPrice = useCartStore((state) => state.getItemPrice);
  const getItemUnitPrice = useCartStore((state) => state.getItemUnitPrice);
  const estimatedShipping = 500; // TODO: Calculate based on location and weight

  // 调整数量（必须是1000的倍数）
  const adjustQuantity = (productId: string, currentQuantity: number, delta: number) => {
    const newQuantity = currentQuantity + delta;
    // 必须是1000的倍数
    const rounded = Math.round(newQuantity / 1000) * 1000;
    // 至少是最小起订量
    const item = items.find(i => i.product.id === productId);
    const minQty = item?.product.minOrderQuantity || 1000;
    const maxQty = item?.product.maxOrderQuantity || 100000;
    const clamped = Math.max(minQty, Math.min(maxQty, rounded));
    updateQuantity(productId, clamped);
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto text-center">
          <ShoppingBag size={64} className="mx-auto text-gray-400 mb-4" />
          <h1 className="text-2xl font-bold mb-2">{t('empty')}</h1>
          <p className="text-gray-600 mb-8">{t('emptyDescription')}</p>
          <Link
            href={`/${locale}/products`}
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            {t('continueShopping')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{t('title')}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={item.product.id}
              className="bg-white rounded-lg shadow-md p-6 flex flex-col md:flex-row gap-4"
            >
              <div className="relative w-full md:w-32 h-32 flex-shrink-0">
                <Image
                  src={item.product.mainImage}
                  alt={item.product.name[locale as 'zh' | 'ja' | 'en']}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>

              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">
                  {item.product.name[locale as 'zh' | 'ja' | 'en']}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {item.product.dimensions.length}×{item.product.dimensions.width}×{item.product.dimensions.height} cm
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-2">
                      <button
                        onClick={() => adjustQuantity(item.product.id, item.quantity, -1000)}
                        disabled={item.quantity <= (item.product.minOrderQuantity || 1000)}
                        className="p-2 border rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="font-semibold w-20 text-center">{item.quantity.toLocaleString()}</span>
                      <button
                        onClick={() => adjustQuantity(item.product.id, item.quantity, 1000)}
                        disabled={item.quantity >= (item.product.maxOrderQuantity || 100000)}
                        className="p-2 border rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <div className="text-sm text-gray-600">
                      {tCommon('unitPrice')}: ¥{getItemUnitPrice(item).toLocaleString()}/{tCommon('unit')}
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="text-xl font-bold text-blue-600">
                        ¥{getItemPrice(item).toLocaleString()}
                      </div>
                      {item.quantity >= 10000 && (
                        <div className="text-xs text-green-600">{tCommon('quantityDiscount')}</div>
                      )}
                    </div>
                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                      aria-label="Remove item"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span>{tCommon('subtotal')}</span>
                <span className="font-semibold">¥{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>{t('estimatedShipping')}</span>
                <span className="font-semibold">¥{estimatedShipping.toLocaleString()}</span>
              </div>
              <div className="border-t pt-4 flex justify-between text-lg font-bold">
                <span>{tCommon('total')}</span>
                <span className="text-blue-600">
                  ¥{(subtotal + estimatedShipping).toLocaleString()}
                </span>
              </div>
            </div>

            <Link
              href={`/${locale}/checkout`}
              className="block w-full bg-blue-600 text-white py-4 rounded-lg font-semibold text-center hover:bg-blue-700 transition-colors"
            >
              {t('checkout')}
            </Link>

            <Link
              href={`/${locale}/products`}
              className="block w-full mt-4 text-center text-blue-600 hover:text-blue-800"
            >
              {t('continueShopping')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

