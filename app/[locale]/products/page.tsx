'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PRODUCTS, getProductsBySize, getProductsByUsage } from '@/data/products';
import { Product, UsageCategory } from '@/types/product';
import { Filter, X } from 'lucide-react';

export default function ProductsPage() {
  const t = useTranslations('products');
  const locale = useLocale() as 'zh' | 'ja' | 'en';
  const searchParams = useSearchParams();
  
  const [filters, setFilters] = useState({
    size: searchParams.get('size') || '',
    usage: searchParams.get('usage') || '',
    handHoles: searchParams.get('handHoles') || '',
    sortBy: 'popularity',
  });
  
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = useMemo(() => {
    let products: Product[] = [...PRODUCTS];

    // Filter by size
    if (filters.size) {
      products = getProductsBySize(Number(filters.size));
    }

    // Filter by usage
    if (filters.usage) {
      products = products.filter((p) =>
        p.usageCategories.includes(filters.usage as UsageCategory)
      );
    }

    // Filter by hand holes
    if (filters.handHoles === 'yes') {
      products = products.filter((p) => p.hasHandHoles);
    } else if (filters.handHoles === 'no') {
      products = products.filter((p) => !p.hasHandHoles);
    }

    // Sort
    switch (filters.sortBy) {
      case 'priceLow':
        products.sort((a, b) => a.price - b.price);
        break;
      case 'priceHigh':
        products.sort((a, b) => b.price - a.price);
        break;
      case 'sizeAsc':
        products.sort((a, b) => a.sizeCode - b.sizeCode);
        break;
      default:
        // Popularity (hot products first)
        products.sort((a, b) => {
          if (a.isHot && !b.isHot) return -1;
          if (!a.isHot && b.isHot) return 1;
          return 0;
        });
    }

    return products;
  }, [filters]);

  const updateFilter = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      size: '',
      usage: '',
      handHoles: '',
      sortBy: 'popularity',
    });
  };

  const hasActiveFilters = filters.size || filters.usage || filters.handHoles;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">{t('title')}</h1>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="md:hidden flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          <Filter size={20} />
          <span>Filters</span>
        </button>
      </div>

      <div className="flex gap-8">
        {/* Filters Sidebar */}
        <aside
          className={`${
            showFilters ? 'block' : 'hidden'
          } md:block w-full md:w-64 flex-shrink-0`}
        >
          <div className="bg-white p-6 rounded-lg shadow-md sticky top-24">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold text-lg">Filters</h2>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Size Filter */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">
                {t('filters.size')}
              </label>
              <select
                value={filters.size}
                onChange={(e) => updateFilter('size', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
              >
                <option value="">All Sizes</option>
                {[60, 80, 100, 120].map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>

            {/* Usage Filter */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">
                {t('filters.usage')}
              </label>
              <select
                value={filters.usage}
                onChange={(e) => updateFilter('usage', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
              >
                <option value="">All Uses</option>
                <option value="moving">Moving</option>
                <option value="ecommerce">E-commerce</option>
                <option value="storage">Storage</option>
                <option value="wine">Wine</option>
              </select>
            </div>

            {/* Hand Holes Filter */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">
                {t('filters.handHoles')}
              </label>
              <select
                value={filters.handHoles}
                onChange={(e) => updateFilter('handHoles', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
              >
                <option value="">All</option>
                <option value="yes">With Hand Holes</option>
                <option value="no">Without Hand Holes</option>
              </select>
            </div>

            {/* Sort */}
            <div>
              <label className="block text-sm font-medium mb-2">
                {t('filters.sortBy')}
              </label>
              <select
                value={filters.sortBy}
                onChange={(e) => updateFilter('sortBy', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
              >
                <option value="popularity">{t('filters.popularity')}</option>
                <option value="priceLow">{t('filters.priceLow')}</option>
                <option value="priceHigh">{t('filters.priceHigh')}</option>
                <option value="sizeAsc">{t('filters.sizeAsc')}</option>
              </select>
            </div>
          </div>
        </aside>

        {/* Products Grid */}
        <div className="flex-1">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
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
                    {product.isHot && (
                      <span className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm">
                        Hot
                      </span>
                    )}
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
                    <p className="text-gray-600 text-sm mb-2">
                      {product.dimensions.length}×{product.dimensions.width}×{product.dimensions.height} cm
                    </p>
                    {product.suitableFor && (
                      <p className="text-xs text-blue-600 mb-4">
                        {product.suitableFor}
                      </p>
                    )}
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-blue-600">
                        ¥{product.price.toLocaleString()}
                      </span>
                      <span className="text-sm text-gray-500">
                        {t('viewDetails')} →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">{t('noResults')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

