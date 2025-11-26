'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Search, X } from 'lucide-react';
import { searchProducts } from '@/data/products';
import { Product } from '@/types/product';
import Link from 'next/link';
import Image from 'next/image';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const t = useTranslations('common');
  const locale = useLocale() as 'zh' | 'ja' | 'en';
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);

  const handleSearch = (value: string) => {
    setQuery(value);
    if (value.trim()) {
      const searchResults = searchProducts(value, locale);
      setResults(searchResults);
    } else {
      setResults([]);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-20 px-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] overflow-hidden">
        <div className="flex items-center border-b p-4">
          <Search className="text-gray-400 mr-3" size={20} />
          <input
            type="text"
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder={t('search')}
            className="flex-1 outline-none text-lg"
            autoFocus
          />
          <button
            onClick={onClose}
            className="ml-4 p-2 hover:bg-gray-100 rounded"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        <div className="overflow-y-auto max-h-[60vh]">
          {results.length > 0 ? (
            <div className="p-4 space-y-4">
              {results.map((product) => (
                <Link
                  key={product.id}
                  href={`/${locale}/products/${product.slug}`}
                  onClick={onClose}
                  className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <div className="relative w-20 h-20 flex-shrink-0">
                    <Image
                      src={product.mainImage}
                      alt={product.name[locale]}
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">
                      {product.name[locale]}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {product.dimensions.length}×{product.dimensions.width}×{product.dimensions.height} cm
                    </p>
                    <p className="text-lg font-bold text-blue-600 mt-1">
                      ¥{product.price.toLocaleString()}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          ) : query.trim() ? (
            <div className="p-8 text-center text-gray-500">
              {t('noResults')}
            </div>
          ) : (
            <div className="p-8 text-center text-gray-500">
              {t('search')}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
