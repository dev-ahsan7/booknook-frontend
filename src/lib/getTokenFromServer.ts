import { headers } from 'next/headers';
import { auth } from './auth';

export const getTokenFromServer = async () => {
  const jwt = await auth.api.getToken({
    headers: await headers(),
  });
  return jwt?.token;
};
