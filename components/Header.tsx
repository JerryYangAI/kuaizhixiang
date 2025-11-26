'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { ShoppingCart, Search, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useCartStore } from '@/store/cart';
import LanguageSwitcher from './LanguageSwitcher';
import SearchModal from './SearchModal';

export default function Header() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const totalItems = useCartStore((state) => state.getTotalItems());
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const navLinks = [
    { href: `/${locale}`, label: t('home') },
    { href: `/${locale}/products?filter=size`, label: t('shopBySize') },
    { href: `/${locale}/products?filter=usage`, label: t('shopByUsage') },
    { href: `/${locale}/faq`, label: t('faq') },
    { href: `/${locale}/support`, label: t('support') },
    { href: `/${locale}/about`, label: t('about') },
  ];

  return (
    <>
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href={`/${locale}`} className="flex items-center space-x-2">
              <div className="text-xl font-bold text-gray-800">
                快纸箱
              </div>
              <div className="text-sm text-gray-500 hidden sm:block">
                kuaizhixiang.com
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-700 hover:text-blue-600 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right side actions */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-gray-700 hover:text-blue-600 transition-colors"
                aria-label="Search"
              >
                <Search size={20} />
              </button>

              <LanguageSwitcher />

              <Link
                href={`/${locale}/cart`}
                className="relative p-2 text-gray-700 hover:text-blue-600 transition-colors"
              >
                <ShoppingCart size={20} />
                {totalItems > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 text-gray-700"
                aria-label="Menu"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <nav className="md:hidden py-4 border-t">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block py-2 text-gray-700 hover:text-blue-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          )}
        </div>
      </header>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
