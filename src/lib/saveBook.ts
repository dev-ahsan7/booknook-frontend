import { getTokenFromClient } from './getTokenFromClient';
import { uploadImage } from './uploadImage';

// Used by both forms: POST /books to add, PATCH /books/:id to edit
export const saveBook = async (
  formData: FormData,
  path: string,
  method: 'POST' | 'PATCH',
  currentImage = '',
) => {
  const file = formData.get('image') as File;
  const image = file.size > 0 ? await uploadImage(file) : currentImage;
  const token = await getTokenFromClient();

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URI}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      title: formData.get('title'),
      author: formData.get('author'),
      category: formData.get('category'),
      description: formData.get('description'),
      totalCopies: formData.get('totalCopies'),
      image,
    }),
  });
  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message);
  }
};

// fetch throws a TypeError when the network or server can't be reached
export const getErrorMessage = (error: unknown) =>
  error instanceof Error && !(error instanceof TypeError)
    ? error.message
    : 'Something went wrong. Please check your connection and try again.';
