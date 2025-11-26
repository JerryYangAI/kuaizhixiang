import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { getHotProducts, PRODUCTS } from '@/data/products';
import { Package, Truck, Shield, Heart } from 'lucide-react';

export default function HomePage() {
  const t = useTranslations('home');
  const locale = useLocale() as 'zh' | 'ja' | 'en';
  const hotProducts = getHotProducts();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-green-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {t('hero.title')}
            </h1>
            <p className="text-xl md:text-2xl mb-4">
              {t('hero.subtitle')}
            </p>
            <p className="text-lg mb-8 opacity-90">
              {t('hero.description')}
            </p>
            <Link
              href={`/${locale}/products`}
              className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
            >
              {t('hero.cta')}
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="text-blue-600" size={32} />
              </div>
              <h3 className="font-semibold text-lg mb-2">标准尺寸</h3>
              <p className="text-gray-600 text-sm">宅急便标准规格</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="text-green-600" size={32} />
              </div>
              <h3 className="font-semibold text-lg mb-2">快速配送</h3>
              <p className="text-gray-600 text-sm">当日或次日送达</p>
            </div>
            <div className="text-center">
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="text-yellow-600" size={32} />
              </div>
              <h3 className="font-semibold text-lg mb-2">安全支付</h3>
              <p className="text-gray-600 text-sm">Stripe加密支付</p>
            </div>
            <div className="text-center">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="text-red-600" size={32} />
              </div>
              <h3 className="font-semibold text-lg mb-2">友好服务</h3>
              <p className="text-gray-600 text-sm">中文客服支持</p>
            </div>
          </div>
        </div>
      </section>

      {/* Shop by Size */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            {t('shopBySize.title')}
          </h2>
          <p className="text-center text-gray-600 mb-12">
            {t('shopBySize.description')}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[60, 80, 100, 120].map((size) => (
              <Link
                key={size}
                href={`/${locale}/products?size=${size}`}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center"
              >
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {size}
                </div>
                <div className="text-sm text-gray-600">宅急便 {size}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Shop by Usage */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            {t('shopByUsage.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { key: 'moving', label: t('shopByUsage.moving') },
              { key: 'ecommerce', label: t('shopByUsage.ecommerce') },
              { key: 'storage', label: t('shopByUsage.storage') },
              { key: 'wine', label: t('shopByUsage.wine') },
            ].map((usage) => (
              <Link
                key={usage.key}
                href={`/${locale}/products?usage=${usage.key}`}
                className="bg-gradient-to-br from-blue-50 to-green-50 p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center border-2 border-transparent hover:border-blue-300"
              >
                <h3 className="text-xl font-semibold text-gray-800">
                  {usage.label}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Hot Products */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">
              {t('hotProducts.title')}
            </h2>
            <Link
              href={`/${locale}/products`}
              className="text-blue-600 hover:text-blue-800 font-semibold"
            >
              {t('hotProducts.viewAll')} →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {hotProducts.slice(0, 3).map((product) => (
              <Link
                key={product.id}
                href={`/${locale}/products/${product.slug}`}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
              >
                <div className="relative h-64">
                  <Image
                    src={product.mainImage}
                    alt={product.name[locale]}
                    fill
                    className="object-cover"
                  />
                  {product.isNew && (
                    <span className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm">
                      New
                    </span>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">
                    {product.name[locale]}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {product.dimensions.length}×{product.dimensions.width}×{product.dimensions.height} cm
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-blue-600">
                      ¥{product.price.toLocaleString()}
                    </span>
                    <span className="text-sm text-gray-500">
                      {product.suitableFor}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Shipping Info */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            {t('shipping.title')}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('shipping.description')}
          </p>
        </div>
      </section>
    </div>
  );
}

