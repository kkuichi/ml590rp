'use server';

import { cookies } from 'next/headers';

export async function changeLanguage(lang: string = 'en') {
  const sessionCookies = await cookies();
  if (sessionCookies.get('language')?.value === lang) {
    return false;
  }
  sessionCookies.set('language', lang, {
    path: '/',
    httpOnly: true,
    secure: true,
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'strict',
  });
  return true;
}
