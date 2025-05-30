'use server';

import { User } from 'next-auth';

export default async function authenticate(user: User) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/authenticate`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      },
      body: JSON.stringify({
        email: user.email,
        id: user.id,
      }),
    }
  );
  return response.ok;
}
