import { NextResponse } from 'next/server';
import { ensureWaitlistTable, addWaitlistEmail } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email is required' }, { status: 400 });
    }

    await ensureWaitlistTable();
    await addWaitlistEmail(email);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Waitlist error:', error);
    return NextResponse.json({ error: 'Failed to save email' }, { status: 500 });
  }
}
