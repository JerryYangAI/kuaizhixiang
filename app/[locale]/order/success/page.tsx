'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';
import { useEffect } from 'react';
import { useCartStore } from '@/store/cart';

export default function OrderSuccessPage() {
  const t = useTranslations('order.success');
  const locale = useLocale();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    // Clear cart after successful order
    if (sessionId) {
      clearCart();
    }
  }, [sessionId, clearCart]);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto text-center">
        <CheckCircle size={64} className="mx-auto text-green-500 mb-6" />
        <h1 className="text-3xl font-bold mb-4">{t('title')}</h1>
        <p className="text-xl mb-2">{t('thankYou')}</p>
        {sessionId && (
          <p className="text-gray-600 mb-2">
            {t('orderNumber')}: {sessionId}
          </p>
        )}
        <p className="text-gray-600 mb-8">{t('confirmationEmail')}</p>
        <Link
          href={`/${locale}/products`}
          className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          {t('continueShopping')}
        </Link>
      </div>
    </div>
  );
}

