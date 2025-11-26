import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { Home } from 'lucide-react';

export default function PrivacyPage() {
  const t = useTranslations('legal.privacy');
  const locale = useLocale();

  const sections = [
    {
      key: 'intro',
      title: t('sections.intro.title'),
      content: t('sections.intro.body'),
    },
    {
      key: 'scope',
      title: t('sections.scope.title'),
      content: t('sections.scope.body'),
    },
    {
      key: 'collect',
      title: t('sections.collect.title'),
      content: t('sections.collect.body'),
    },
    {
      key: 'use',
      title: t('sections.use.title'),
      content: t('sections.use.body'),
    },
    {
      key: 'sharing',
      title: t('sections.sharing.title'),
      content: t('sections.sharing.body'),
    },
    {
      key: 'cookies',
      title: t('sections.cookies.title'),
      content: t('sections.cookies.body'),
    },
    {
      key: 'security',
      title: t('sections.security.title'),
      content: t('sections.security.body'),
    },
    {
      key: 'retention',
      title: t('sections.retention.title'),
      content: t('sections.retention.body'),
    },
    {
      key: 'rights',
      title: t('sections.rights.title'),
      content: t('sections.rights.body'),
    },
    {
      key: 'changes',
      title: t('sections.changes.title'),
      content: t('sections.changes.body'),
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



