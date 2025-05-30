'use server';

import { signOut } from '@/config/auth/auth';

export async function signOutUser() {
  await signOut({
    redirectTo: process.env.NEXT_PUBLIC_BASE_URL,
  });
}
