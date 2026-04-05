import { NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';

export async function POST(request: Request) {
  try {
    const stripe = getStripe();
    const { priceId, email } = await request.json();

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      customer_email: email || undefined,
      line_items: [
        {
          price: priceId || process.env.STRIPE_DEFAULT_PRICE_ID,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Stripe checkout error:', error);
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 });
  }
}
