'use client';

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { Search } from 'lucide-react';
import FAQAccordion from '@/components/FAQAccordion';

export default function FAQPage() {
  const t = useTranslations('faq');
  const [searchQuery, setSearchQuery] = useState('');

  // Define FAQ sections
  const sections = [
    {
      key: 'chooseBox',
      title: t('sections.chooseBox.title'),
      items: [
        {
          id: 'q1',
          question: t('sections.chooseBox.items.q1.question'),
          answer: t('sections.chooseBox.items.q1.answer'),
        },
        {
          id: 'q2',
          question: t('sections.chooseBox.items.q2.question'),
          answer: t('sections.chooseBox.items.q2.answer'),
        },
        {
          id: 'q3',
          question: t('sections.chooseBox.items.q3.question'),
          answer: t('sections.chooseBox.items.q3.answer'),
        },
      ],
    },
    {
      key: 'orders',
      title: t('sections.orders.title'),
      items: [
        {
          id: 'q1',
          question: t('sections.orders.items.q1.question'),
          answer: t('sections.orders.items.q1.answer'),
        },
        {
          id: 'q2',
          question: t('sections.orders.items.q2.question'),
          answer: t('sections.orders.items.q2.answer'),
        },
        {
          id: 'q3',
          question: t('sections.orders.items.q3.question'),
          answer: t('sections.orders.items.q3.answer'),
        },
      ],
    },
    {
      key: 'shipping',
      title: t('sections.shipping.title'),
      items: [
        {
          id: 'q1',
          question: t('sections.shipping.items.q1.question'),
          answer: t('sections.shipping.items.q1.answer'),
        },
        {
          id: 'q2',
          question: t('sections.shipping.items.q2.question'),
          answer: t('sections.shipping.items.q2.answer'),
        },
        {
          id: 'q3',
          question: t('sections.shipping.items.q3.question'),
          answer: t('sections.shipping.items.q3.answer'),
        },
      ],
    },
    {
      key: 'invoice',
      title: t('sections.invoice.title'),
      items: [
        {
          id: 'q1',
          question: t('sections.invoice.items.q1.question'),
          answer: t('sections.invoice.items.q1.answer'),
        },
        {
          id: 'q2',
          question: t('sections.invoice.items.q2.question'),
          answer: t('sections.invoice.items.q2.answer'),
        },
      ],
    },
    {
      key: 'returns',
      title: t('sections.returns.title'),
      items: [
        {
          id: 'q1',
          question: t('sections.returns.items.q1.question'),
          answer: t('sections.returns.items.q1.answer'),
        },
        {
          id: 'q2',
          question: t('sections.returns.items.q2.question'),
          answer: t('sections.returns.items.q2.answer'),
        },
        {
          id: 'q3',
          question: t('sections.returns.items.q3.question'),
          answer: t('sections.returns.items.q3.answer'),
        },
      ],
    },
    {
      key: 'support',
      title: t('sections.support.title'),
      items: [
        {
          id: 'q1',
          question: t('sections.support.items.q1.question'),
          answer: t('sections.support.items.q1.answer'),
        },
        {
          id: 'q2',
          question: t('sections.support.items.q2.question'),
          answer: t('sections.support.items.q2.answer'),
        },
      ],
    },
  ];

  // Filter FAQ items based on search query
  const filteredSections = useMemo(() => {
    if (!searchQuery.trim()) {
      return sections;
    }

    const query = searchQuery.toLowerCase();
    return sections
      .map((section) => ({
        ...section,
        items: section.items.filter(
          (item) =>
            item.question.toLowerCase().includes(query) ||
            item.answer.toLowerCase().includes(query)
        ),
      }))
      .filter((section) => section.items.length > 0);
  }, [searchQuery, sections]);

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">{t('title')}</h1>
          <p className="text-lg text-gray-600">{t('intro')}</p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('searchPlaceholder')}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* FAQ Sections */}
        <div className="space-y-8">
          {filteredSections.length > 0 ? (
            filteredSections.map((section) => (
              <div key={section.key}>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900">
                  {section.title}
                </h2>
                <div className="space-y-4">
                  {section.items.map((item) => (
                    <FAQAccordion
                      key={`${section.key}-${item.id}`}
                      question={item.question}
                      answer={item.answer}
                    />
                  ))}
                </div>
              </div>
            ))
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
