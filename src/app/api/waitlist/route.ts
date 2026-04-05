import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

async function ensureWaitlistTable() {
  await sql`
    CREATE TABLE IF NOT EXISTS waitlist (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    )
  `;
}

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email is required' }, { status: 400 });
    }

    await ensureWaitlistTable();
    await sql`INSERT INTO waitlist (email) VALUES (${email}) ON CONFLICT (email) DO NOTHING`;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Waitlist error:', error);
    return NextResponse.json({ error: 'Failed to save email' }, { status: 500 });
  }
}
