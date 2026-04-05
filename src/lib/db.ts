import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL?.includes('sslmode=require')
    ? { rejectUnauthorized: false }
    : false,
});

export async function query(text: string, params?: unknown[]) {
  const res = await pool.query(text, params);
  return res;
}

export async function ensureCommentsTable() {
  await query(`
    CREATE TABLE IF NOT EXISTS comments (
      id SERIAL PRIMARY KEY,
      section VARCHAR(100) NOT NULL,
      author VARCHAR(100) NOT NULL,
      content TEXT NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    )
  `);
}

export async function ensureWaitlistTable() {
  await query(`
    CREATE TABLE IF NOT EXISTS waitlist (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    )
  `);
}

export async function getComments(section?: string) {
  if (section) {
    const { rows } = await query(
      'SELECT * FROM comments WHERE section = $1 ORDER BY created_at DESC',
      [section]
    );
    return rows;
  }
  const { rows } = await query('SELECT * FROM comments ORDER BY created_at DESC');
  return rows;
}

export async function addComment(section: string, author: string, content: string) {
  const { rows } = await query(
    'INSERT INTO comments (section, author, content) VALUES ($1, $2, $3) RETURNING *',
    [section, author, content]
  );
  return rows[0];
}

export async function addWaitlistEmail(email: string) {
  await query(
    'INSERT INTO waitlist (email) VALUES ($1) ON CONFLICT (email) DO NOTHING',
    [email]
  );
}
