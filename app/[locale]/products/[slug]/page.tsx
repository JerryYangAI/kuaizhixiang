'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';
import { getProductBySlug, PRODUCTS, getPriceForQuantity, getTotalPrice } from '@/data/products';
import { useCartStore } from '@/store/cart';
import { Minus, Plus, ShoppingCart } from 'lucide-react';
import Link from 'next/link';

export default function ProductDetailPage() {
  const t = useTranslations('product');
  const tCommon = useTranslations('common');
  const locale = useLocale() as 'zh' | 'ja' | 'en';
  const params = useParams();
  const slug = params.slug as string;
  
  const product = getProductBySlug(slug);
  const addItem = useCartStore((state) => state.addItem);
  const minQuantity = product?.minOrderQuantity || 1000;
  const maxQuantity = product?.maxOrderQuantity || 100000;
  const [quantity, setQuantity] = useState(minQuantity);
  const [quantityInput, setQuantityInput] = useState(String(minQuantity));
  const [selectedImage, setSelectedImage] = useState(0);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
        <Link href={`/${locale}/products`} className="text-blue-600 hover:underline">
          Back to products
        </Link>
      </div>
    );
  }

  const allImages = [product.mainImage, ...product.galleryImages];
  const relatedProducts = PRODUCTS.filter(
    (p) =>
      p.id !== product.id &&
      (p.sizeCode === product.sizeCode ||
        p.usageCategories.some((cat) => product.usageCategories.includes(cat)))
  ).slice(0, 3);

  // 验证并调整数量
  const adjustQuantity = (newQuantity: number) => {
    // 必须是1000的倍数
    const rounded = Math.round(newQuantity / 1000) * 1000;
    // 限制在最小和最大之间
    const clamped = Math.max(minQuantity, Math.min(maxQuantity, rounded));
    setQuantity(clamped);
    setQuantityInput(String(clamped));
  };

  // 处理手动输入
  const handleQuantityInputChange = (value: string) => {
    setQuantityInput(value);
    const num = parseInt(value, 10);
    if (!isNaN(num)) {
      adjustQuantity(num);
    }
  };

  // 快速选择数量
  const quickSelectQuantity = (qty: number) => {
    adjustQuantity(qty);
  };

  const handleAddToCart = () => {
    if (quantity < minQuantity || quantity > maxQuantity) {
      // TODO: Show error toast
      return;
    }
    if (quantity % 1000 !== 0) {
      // TODO: Show error toast - must be multiple of 1000
      return;
    }
    addItem(product, quantity);
    // TODO: Show success toast
  };

  // 计算当前单价和总价
  const unitPrice = product ? getPriceForQuantity(product, quantity) : 0;
  const totalPrice = product ? getTotalPrice(product, quantity) : 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Image Gallery */}
        <div>
          <div className="relative h-96 mb-4 bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src={allImages[selectedImage]}
              alt={product.name[locale]}
              fill
              className="object-cover"
            />
          </div>
          {allImages.length > 1 && (
            <div className="grid grid-cols-4 gap-4">
              {allImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative h-24 rounded-lg overflow-hidden border-2 ${
                    selectedImage === index ? 'border-blue-600' : 'border-transparent'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.name[locale]} ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name[locale]}</h1>
          
          {product.suitableFor && (
            <div className="mb-4">
              <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                {product.suitableFor}
              </span>
            </div>
          )}

          <div className="mb-6">
            <div className="text-sm text-gray-600 mb-2">
              {t('wholesalePrice')} ({t('minOrder')}: {minQuantity}{t('units')})
            </div>
            <div className="text-4xl font-bold text-blue-600">
              ¥{unitPrice.toLocaleString()}<span className="text-lg">/{t('unit')}</span>
            </div>
            {quantity > minQuantity && (
              <div className="text-sm text-green-600 mt-1">
                {t('quantityDiscount')}: {quantity >= 10000 ? '✓' : ''}
              </div>
            )}
          </div>

          <div className="space-y-4 mb-8">
            <div>
              <span className="font-semibold">{t('dimensions')}: </span>
              {product.dimensions.length} × {product.dimensions.width} × {product.dimensions.height} cm
            </div>
            <div>
              <span className="font-semibold">{t('thickness')}: </span>
              {product.thickness} mm
            </div>
            <div>
              <span className="font-semibold">{t('weightCapacity')}: </span>
              {product.weightCapacity} kg
            </div>
            <div>
              <span className="font-semibold">{t('material')}: </span>
              {product.material}
            </div>
            {product.hasHandHoles && (
              <div className="text-green-600">✓ {tCommon('handHoles')}</div>
            )}
          </div>

          <div className="mb-8">
            <h3 className="font-semibold mb-2">{t('description')}</h3>
            <p className="text-gray-700">{product.description[locale]}</p>
          </div>

          {/* Wholesale Quantity Selector */}
          <div className="mb-6">
            <label className="block font-semibold mb-2">
              {tCommon('quantity')} ({t('mustBeMultipleOf1000')})
            </label>
            
            {/* Quick Select Buttons */}
            <div className="grid grid-cols-4 gap-2 mb-4">
              {[1000, 10000, 50000, 100000].map((qty) => (
                <button
                  key={qty}
                  onClick={() => quickSelectQuantity(qty)}
                  className={`px-4 py-2 border rounded-lg font-semibold transition-colors ${
                    quantity === qty
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white hover:bg-gray-50 border-gray-300'
                  }`}
                >
                  {qty.toLocaleString()}
                </button>
              ))}
            </div>

            {/* Manual Input */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => adjustQuantity(quantity - 1000)}
                disabled={quantity <= minQuantity}
                className="p-2 border rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Minus size={20} />
              </button>
              <input
                type="number"
                value={quantityInput}
                onChange={(e) => handleQuantityInputChange(e.target.value)}
                onBlur={() => adjustQuantity(parseInt(quantityInput, 10) || minQuantity)}
                min={minQuantity}
                max={maxQuantity}
                step={1000}
                className="text-xl font-semibold w-32 text-center border rounded-lg px-2 py-1"
              />
              <button
                onClick={() => adjustQuantity(quantity + 1000)}
                disabled={quantity >= maxQuantity}
                className="p-2 border rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Plus size={20} />
              </button>
            </div>

            {/* Quantity Info */}
            <div className="mt-2 text-sm text-gray-600">
              {t('minOrder')}: {minQuantity.toLocaleString()} {t('units')} | {t('maxOrder')}: {maxQuantity.toLocaleString()} {t('units')}
              {quantity > maxQuantity && (
                <div className="text-blue-600 mt-1">
                  {t('overMaxOrder')}
                </div>
              )}
            </div>

            {/* Price Display */}
            {quantity >= minQuantity && quantity <= maxQuantity && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">{t('unitPrice')}:</span>
                  <span className="font-semibold">¥{unitPrice.toLocaleString()}/{t('unit')}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">{t('totalPrice')}:</span>
                  <span className="text-2xl font-bold text-blue-600">
                    ¥{totalPrice.toLocaleString()}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
          >
            <ShoppingCart size={24} />
            <span>{tCommon('addToCart')}</span>
          </button>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-8">{t('relatedProducts')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <Link
                key={relatedProduct.id}
                href={`/${locale}/products/${relatedProduct.slug}`}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
              >
                <div className="relative h-48">
                  <Image
                    src={relatedProduct.mainImage}
                    alt={relatedProduct.name[locale]}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold mb-2">{relatedProduct.name[locale]}</h3>
                  <p className="text-blue-600 font-bold">
                    ¥{relatedProduct.price.toLocaleString()}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

