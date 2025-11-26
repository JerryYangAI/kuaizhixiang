import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';

export default function Footer() {
  const t = useTranslations('footer');
  const locale = useLocale();

  const links = [
    { href: `/${locale}/about`, label: t('links.about') },
    { href: `/${locale}/faq`, label: t('links.faq') },
    { href: `/${locale}/support`, label: t('links.support') },
    { href: `/${locale}/privacy`, label: t('links.privacy') },
    { href: `/${locale}/terms`, label: t('links.terms') },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">
              {t('company')}
            </h3>
            <p className="text-sm mb-2">{t('warehouse')}</p>
            <p className="text-xs text-gray-500 mt-4">
              {t('copyright')} © {new Date().getFullYear()}
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">
              {t('links.about')}
            </h3>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">
              {t('links.support')}
            </h3>
            <p className="text-sm">
              Email: yangguang8666@gmail.com
            </p>
            <p className="text-sm mt-2">
              {t('warehouse')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
