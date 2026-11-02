export const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append('image', file);

  const response = await fetch(
    `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
    { method: 'POST', body: formData },
  );

  if (!response.ok) {
    throw new Error('Could not upload the image. Please try another one.');
  }

  const result = await response.json();
  return result.data.url as string;
};
