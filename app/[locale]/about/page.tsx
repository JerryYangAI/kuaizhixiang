import { getTranslations } from 'next-intl/server';
import { setRequestLocale } from 'next-intl/server';
import { Package, Warehouse, Shield, MessageCircle, CheckCircle } from 'lucide-react';

export default async function AboutPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const t = await getTranslations('about');

  const advantages = [
    {
      icon: Package,
      key: 'standardSize',
      title: t('advantages.standardSize.title'),
      desc1: t('advantages.standardSize.desc1'),
      desc2: t('advantages.standardSize.desc2'),
      desc3: t('advantages.standardSize.desc3'),
    },
    {
      icon: Warehouse,
      key: 'warehouse',
      title: t('advantages.warehouse.title'),
      desc1: t('advantages.warehouse.desc1'),
      desc2: t('advantages.warehouse.desc2'),
      desc3: t('advantages.warehouse.desc3'),
    },
    {
      icon: Shield,
      key: 'quality',
      title: t('advantages.quality.title'),
      desc1: t('advantages.quality.desc1'),
      desc2: t('advantages.quality.desc2'),
      desc3: t('advantages.quality.desc3'),
    },
    {
      icon: MessageCircle,
      key: 'service',
      title: t('advantages.service.title'),
      desc1: t('advantages.service.desc1'),
      desc2: t('advantages.service.desc2'),
      desc3: t('advantages.service.desc3'),
    },
  ];

  const customerList = [
    t('customers.list.0'),
    t('customers.list.1'),
    t('customers.list.2'),
    t('customers.list.3'),
  ];

  const commitments = [
    { key: 'size', text: t('commitment.size') },
    { key: 'price', text: t('commitment.price') },
    { key: 'delivery', text: t('commitment.delivery') },
    { key: 'service', text: t('commitment.service') },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* 标题 */}
        <h1 className="text-4xl font-bold text-center mb-8">{t('title')}</h1>

        {/* 介绍 */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            {t('intro')}
          </p>
          <p className="text-lg text-gray-700 font-semibold leading-relaxed">
            {t('mission')}
          </p>
        </div>

        {/* 我们的优势 */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">
            {t('advantages.title')}
          </h2>
          <div className="space-y-8">
            {advantages.map((advantage) => {
              const Icon = advantage.icon;
              return (
                <div
                  key={advantage.key}
                  className="bg-white rounded-lg shadow-md p-8"
                >
                  <div className="flex items-start space-x-4 mb-4">
                    <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon className="text-blue-600" size={24} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-semibold mb-4">
                        {advantage.title}
                      </h3>
                      <ul className="space-y-2 text-gray-700">
                        <li className="flex items-start">
                          <span className="text-blue-600 mr-2">•</span>
                          <span>{advantage.desc1}</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-blue-600 mr-2">•</span>
                          <span>{advantage.desc2}</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-blue-600 mr-2">•</span>
                          <span>{advantage.desc3}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 我们服务的客户 */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <h2 className="text-3xl font-bold mb-6">
            {t('customers.title')}
          </h2>
          <ul className="space-y-3 mb-6">
            {customerList.map((customer, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle className="text-green-600 mr-3 mt-1 flex-shrink-0" size={20} />
                <span className="text-gray-700">{customer}</span>
              </li>
            ))}
          </ul>
          <p className="text-gray-700 italic mt-6">
            {t('customers.conclusion')}
          </p>
        </div>

        {/* 品牌承诺 */}
        <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg shadow-md p-8">
          <h2 className="text-3xl font-bold mb-6 text-center">
            {t('commitment.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {commitments.map((commitment) => (
              <div
                key={commitment.key}
                className="bg-white rounded-lg p-4 shadow-sm"
              >
                <p className="text-gray-700">{commitment.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
