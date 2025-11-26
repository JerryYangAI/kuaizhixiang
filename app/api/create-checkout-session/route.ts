import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

// TODO: Add your Stripe secret key to environment variables
// STRIPE_SECRET_KEY=sk_test_...
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { items, shippingInfo, deliveryOption, locale } = body;

    // TODO: Get success and cancel URLs from environment variables or construct from request
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const successUrl = `${baseUrl}/${locale}/order/success?session_id={CHECKOUT_SESSION_ID}`;
    const cancelUrl = `${baseUrl}/${locale}/checkout`;

    // Create line items for Stripe
    const lineItems = items.map((item: any) => ({
      price_data: {
        currency: 'jpy',
        product_data: {
          name: item.name,
        },
        unit_amount: item.price, // Price in JPY (smallest currency unit)
      },
      quantity: item.quantity,
    }));

    // Add shipping cost
    const shippingAmount = deliveryOption === 'express' ? 1000 : 500; // TODO: Calculate based on actual shipping
    lineItems.push({
      price_data: {
        currency: 'jpy',
        product_data: {
          name: 'Shipping',
        },
        unit_amount: shippingAmount,
      },
      quantity: 1,
    });

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: successUrl,
      cancel_url: cancelUrl,
      customer_email: shippingInfo.email,
      shipping_address_collection: {
        allowed_countries: ['JP'],
      },
      metadata: {
        shipping_name: shippingInfo.name,
        shipping_phone: shippingInfo.phone,
        shipping_postcode: shippingInfo.postcode,
        shipping_prefecture: shippingInfo.prefecture,
        shipping_city: shippingInfo.city,
        shipping_street: shippingInfo.street,
        shipping_building: shippingInfo.building || '',
        shipping_notes: shippingInfo.notes || '',
        delivery_option: deliveryOption,
      },
      locale: locale === 'zh' ? 'zh' : locale === 'ja' ? 'ja' : 'en',
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error('Stripe error:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

