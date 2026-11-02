import { getTokenFromServer } from './getTokenFromServer';
import type { Book } from './types';

const API_URI = process.env.NEXT_PUBLIC_API_URI;

export const getBooks = async (query = ''): Promise<Book[]> => {
  const response = await fetch(`${API_URI}/books${query}`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Could not load the books.');
  }

  return response.json();
};

export const getBook = async (id: string): Promise<Book | null> => {
  const token = await getTokenFromServer();
  const response = await fetch(`${API_URI}/books/${id}`, {
    cache: 'no-store',
    headers: { Authorization: `Bearer ${token}` },
  });

  if (response.status === 404) {
    return null;
  }
  if (!response.ok) {
    throw new Error('Could not load this book.');
  }

  return response.json();
};
