'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Mail, MessageCircle, Phone } from 'lucide-react';
import Image from 'next/image';

export default function SupportPage() {
  const t = useTranslations('support');
  const locale = useLocale();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // TODO: Implement actual contact form submission
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-4">{t('title')}</h1>
      <p className="text-center text-gray-600 mb-12">{t('description')}</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
        {/* Contact Form */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold mb-6">Contact Form</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block font-semibold mb-2">{t('form.name')}</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block font-semibold mb-2">{t('form.email')}</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block font-semibold mb-2">{t('form.message')}</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg"
                rows={6}
                required
              />
            </div>
            {submitStatus === 'success' && (
              <div className="bg-green-100 text-green-800 px-4 py-3 rounded-lg">
                {t('form.success')}
              </div>
            )}
            {submitStatus === 'error' && (
              <div className="bg-red-100 text-red-800 px-4 py-3 rounded-lg">
                {t('form.error')}
              </div>
            )}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {isSubmitting ? t('form.sending') : t('form.send')}
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="space-y-8">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Mail className="text-blue-600" size={24} />
                <div>
                  <div className="font-semibold">{t('email')}</div>
                  <div className="text-gray-600">yangguang8666@gmail.com</div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Phone className="text-blue-600" size={24} />
                <div>
                  <div className="font-semibold">{t('phone')}</div>
                  <div className="text-gray-600">+81-XX-XXXX-XXXX</div>
                </div>
              </div>
            </div>
          </div>

          {/* WeChat QR Code (for Chinese customers) */}
          {locale === 'zh' && (
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold mb-4">{t('wechat')}</h2>
              <div className="bg-gray-100 w-48 h-48 mx-auto flex items-center justify-center rounded-lg">
                <p className="text-gray-500 text-sm">WeChat QR Code Placeholder</p>
                {/* TODO: Replace with actual WeChat QR code image */}
                {/* <Image src="/wechat-qr.png" alt="WeChat QR Code" width={200} height={200} /> */}
              </div>
            </div>
          )}

          {/* LINE (for Japanese customers) */}
          {locale === 'ja' && (
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold mb-4">{t('line')}</h2>
              <div className="bg-gray-100 w-48 h-48 mx-auto flex items-center justify-center rounded-lg">
                <p className="text-gray-500 text-sm">LINE QR Code Placeholder</p>
                {/* TODO: Replace with actual LINE QR code image */}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

