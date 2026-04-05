'use server';

import { addComment, getComments, ensureCommentsTable } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function submitComment(formData: FormData) {
  const section = formData.get('section') as string;
  const author = formData.get('author') as string;
  const content = formData.get('content') as string;

  if (!section || !author || !content) {
    return { error: 'All fields are required' };
  }

  try {
    await ensureCommentsTable();
    const comment = await addComment(section, author, content);
    revalidatePath('/');
    return { success: true, comment };
  } catch (error) {
    console.error('Failed to submit comment:', error);
    return { error: 'Failed to save comment. Database may not be configured.' };
  }
}

export async function fetchComments(section?: string) {
  try {
    await ensureCommentsTable();
    const comments = await getComments(section);
    return { comments };
  } catch (error) {
    console.error('Failed to fetch comments:', error);
    return { comments: [] };
  }
}
