import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { Home } from 'lucide-react';

export default function TermsPage() {
  const t = useTranslations('legal.terms');
  const locale = useLocale();

  const sections = [
    {
      key: 'intro',
      title: t('sections.intro.title'),
      content: t('sections.intro.body'),
    },
    {
      key: 'service',
      title: t('sections.service.title'),
      content: t('sections.service.body'),
    },
    {
      key: 'account',
      title: t('sections.account.title'),
      content: t('sections.account.body'),
    },
    {
      key: 'prices',
      title: t('sections.prices.title'),
      content: t('sections.prices.body'),
    },
    {
      key: 'shipping',
      title: t('sections.shipping.title'),
      content: t('sections.shipping.body'),
    },
    {
      key: 'returns',
      title: t('sections.returns.title'),
      content: t('sections.returns.body'),
    },
    {
      key: 'prohibited',
      title: t('sections.prohibited.title'),
      content: t('sections.prohibited.body'),
    },
    {
      key: 'ip',
      title: t('sections.ip.title'),
      content: t('sections.ip.body'),
    },
    {
      key: 'disclaimers',
      title: t('sections.disclaimers.title'),
      content: t('sections.disclaimers.body'),
    },
    {
      key: 'changes',
      title: t('sections.changes.title'),
      content: t('sections.changes.body'),
    },
    {
      key: 'governing',
      title: t('sections.governing.title'),
      content: t('sections.governing.body'),
    },
    {
      key: 'contact',
      title: t('sections.contact.title'),
      content: t('sections.contact.body'),
    },
  ];

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {t('title')}
          </h1>
          <p className="text-lg text-gray-600 mb-2">
            {t('brand')}
          </p>
          <p className="text-sm text-gray-500">
            {t('lastUpdated')}: {t('lastUpdatedDate')}
          </p>
        </div>

        {/* Content Sections */}
        <div className="bg-white rounded-lg shadow-md p-8 space-y-8">
          {sections.map((section) => (
            <section key={section.key} className="border-b border-gray-200 pb-8 last:border-b-0 last:pb-0">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">
                {section.title}
              </h2>
              <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                {section.content}
              </div>
            </section>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-gray-600 italic">
            {t('disclaimer')}
          </p>
        </div>

        {/* Back to Home */}
        <div className="mt-8 text-center">
          <Link
            href={`/${locale}`}
            className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors"
          >
            <Home size={18} />
            <span>{t('backToHome')}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}



