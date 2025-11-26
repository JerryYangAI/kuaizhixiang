'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store/cart';
import { ShippingInfo } from '@/types/product';
import { Check, Lock } from 'lucide-react';
import Link from 'next/link';

export default function CheckoutPage() {
  const t = useTranslations('checkout');
  const tCommon = useTranslations('common');
  const locale = useLocale();
  const router = useRouter();
  
  const items = useCartStore((state) => state.items);
  const subtotal = useCartStore((state) => state.getSubtotal());
  const clearCart = useCartStore((state) => state.clearCart);
  
  const [step, setStep] = useState(1);
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    name: '',
    phone: '',
    email: '',
    postcode: '',
    prefecture: '',
    city: '',
    street: '',
    building: '',
    notes: '',
  });
  const [deliveryOption, setDeliveryOption] = useState<'standard' | 'express'>('standard');
  const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'alipay'>('stripe');
  const [isProcessing, setIsProcessing] = useState(false);

  const estimatedShipping = 500; // TODO: Calculate based on location and weight
  const total = subtotal + estimatedShipping;

  const handleShippingInfoChange = (field: keyof ShippingInfo, value: string) => {
    setShippingInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    
    try {
      if (paymentMethod === 'stripe') {
        // Create Stripe Checkout Session
        const response = await fetch('/api/create-checkout-session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            items: items.map((item) => ({
              id: item.product.id,
              name: item.product.name[locale as 'zh' | 'ja' | 'en'],
              price: item.product.price,
              quantity: item.quantity,
            })),
            shippingInfo,
            deliveryOption,
            locale,
          }),
        });

        const { url } = await response.json();
        if (url) {
          window.location.href = url;
        }
      } else if (paymentMethod === 'alipay') {
        // TODO: Implement Alipay integration
        // For now, show a placeholder message
        alert('Alipay integration coming soon. Please use Stripe for now.');
        setIsProcessing(false);
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed. Please try again.');
      setIsProcessing(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <Link href={`/${locale}/products`} className="text-blue-600 hover:underline">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{t('title')}</h1>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          {[1, 2, 3].map((stepNum) => (
            <div key={stepNum} className="flex items-center flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  step >= stepNum
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {step > stepNum ? <Check size={20} /> : stepNum}
              </div>
              {stepNum < 3 && (
                <div
                  className={`flex-1 h-1 mx-2 ${
                    step > stepNum ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between max-w-2xl mx-auto mt-2 text-sm">
          <span>{t('step1')}</span>
          <span>{t('step2')}</span>
          <span>{t('step3')}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Step 1: Shipping Info */}
          {step === 1 && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-6">{t('shippingInfo.title')}</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold mb-2">{t('shippingInfo.name')}</label>
                    <input
                      type="text"
                      value={shippingInfo.name}
                      onChange={(e) => handleShippingInfoChange('name', e.target.value)}
                      className="w-full px-4 py-2 border rounded-lg"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-2">{t('shippingInfo.phone')}</label>
                    <input
                      type="tel"
                      value={shippingInfo.phone}
                      onChange={(e) => handleShippingInfoChange('phone', e.target.value)}
                      className="w-full px-4 py-2 border rounded-lg"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block font-semibold mb-2">{t('shippingInfo.email')}</label>
                  <input
                    type="email"
                    value={shippingInfo.email}
                    onChange={(e) => handleShippingInfoChange('email', e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-2">{t('shippingInfo.postcode')}</label>
                  <input
                    type="text"
                    value={shippingInfo.postcode}
                    onChange={(e) => handleShippingInfoChange('postcode', e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg"
                    required
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold mb-2">{t('shippingInfo.prefecture')}</label>
                    <input
                      type="text"
                      value={shippingInfo.prefecture}
                      onChange={(e) => handleShippingInfoChange('prefecture', e.target.value)}
                      className="w-full px-4 py-2 border rounded-lg"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-2">{t('shippingInfo.city')}</label>
                    <input
                      type="text"
                      value={shippingInfo.city}
                      onChange={(e) => handleShippingInfoChange('city', e.target.value)}
                      className="w-full px-4 py-2 border rounded-lg"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block font-semibold mb-2">{t('shippingInfo.street')}</label>
                  <input
                    type="text"
                    value={shippingInfo.street}
                    onChange={(e) => handleShippingInfoChange('street', e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-2">{t('shippingInfo.building')}</label>
                  <input
                    type="text"
                    value={shippingInfo.building}
                    onChange={(e) => handleShippingInfoChange('building', e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-2">{t('shippingInfo.notes')}</label>
                  <textarea
                    value={shippingInfo.notes}
                    onChange={(e) => handleShippingInfoChange('notes', e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg"
                    rows={3}
                  />
                </div>
                <button
                  onClick={() => setStep(2)}
                  className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  {tCommon('next')}
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Delivery Options */}
          {step === 2 && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-6">{t('delivery.title')}</h2>
              <div className="space-y-4">
                <button
                  onClick={() => setDeliveryOption('standard')}
                  className={`w-full p-4 border-2 rounded-lg text-left ${
                    deliveryOption === 'standard'
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200'
                  }`}
                >
                  <div className="font-semibold">{t('delivery.standard')}</div>
                  <div className="text-sm text-gray-600 mt-1">
                    {t('delivery.estimatedDate')}: 1-2 business days
                  </div>
                </button>
                <button
                  onClick={() => setDeliveryOption('express')}
                  className={`w-full p-4 border-2 rounded-lg text-left ${
                    deliveryOption === 'express'
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200'
                  }`}
                >
                  <div className="font-semibold">{t('delivery.express')}</div>
                  <div className="text-sm text-gray-600 mt-1">
                    {t('delivery.estimatedDate')}: Same day
                  </div>
                </button>
                <div className="flex space-x-4">
                  <button
                    onClick={() => setStep(1)}
                    className="flex-1 bg-gray-200 text-gray-800 py-4 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                  >
                    {tCommon('back')}
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="flex-1 bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    {tCommon('next')}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Payment */}
          {step === 3 && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-6">{t('payment.title')}</h2>
              <div className="space-y-4 mb-6">
                <button
                  onClick={() => setPaymentMethod('stripe')}
                  className={`w-full p-4 border-2 rounded-lg text-left ${
                    paymentMethod === 'stripe'
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200'
                  }`}
                >
                  <div className="font-semibold">{t('payment.stripe')}</div>
                  <div className="text-sm text-gray-600 mt-1 flex items-center space-x-2">
                    <Lock size={14} />
                    <span>{t('payment.securePayment')}</span>
                  </div>
                </button>
                <button
                  onClick={() => setPaymentMethod('alipay')}
                  className={`w-full p-4 border-2 rounded-lg text-left ${
                    paymentMethod === 'alipay'
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200'
                  }`}
                >
                  <div className="font-semibold">{t('payment.alipay')}</div>
                  <div className="text-sm text-gray-600 mt-1">
                    Coming soon
                  </div>
                </button>
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={() => setStep(2)}
                  className="flex-1 bg-gray-200 text-gray-800 py-4 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                >
                  {tCommon('back')}
                </button>
                <button
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className="flex-1 bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {isProcessing ? tCommon('loading') : t('placeOrder')}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
            <h2 className="text-xl font-bold mb-6">{t('orderSummary.title')}</h2>
            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={item.product.id} className="flex justify-between text-sm">
                  <span>
                    {item.product.name[locale as 'zh' | 'ja' | 'en']} × {item.quantity}
                  </span>
                  <span>¥{(item.product.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
              <div className="border-t pt-4 flex justify-between">
                <span>{t('orderSummary.shipping')}</span>
                <span>¥{estimatedShipping.toLocaleString()}</span>
              </div>
              <div className="border-t pt-4 flex justify-between text-lg font-bold">
                <span>{t('orderSummary.total')}</span>
                <span className="text-blue-600">¥{total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

