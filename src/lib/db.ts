import { sql } from '@vercel/postgres';

export async function ensureCommentsTable() {
  await sql`
    CREATE TABLE IF NOT EXISTS comments (
      id SERIAL PRIMARY KEY,
      section VARCHAR(100) NOT NULL,
      author VARCHAR(100) NOT NULL,
      content TEXT NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    )
  `;
}

export async function getComments(section?: string) {
  if (section) {
    const { rows } = await sql`
      SELECT * FROM comments WHERE section = ${section} ORDER BY created_at DESC
    `;
    return rows;
  }
  const { rows } = await sql`
    SELECT * FROM comments ORDER BY created_at DESC
  `;
  return rows;
}

export async function addComment(section: string, author: string, content: string) {
  const { rows } = await sql`
    INSERT INTO comments (section, author, content)
    VALUES (${section}, ${author}, ${content})
    RETURNING *
  `;
  return rows[0];
}
