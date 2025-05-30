import { CredentialsSignin } from 'next-auth';
import { CredentialsSchema } from '../../lib/schemas/schemas';

const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/credentials`;

export async function authorizeCredentials(
  credentials: Partial<Record<'email' | 'password', unknown>>
) {
  if (!credentials) return null;
  const validatedCredentials = CredentialsSchema.parse(credentials);
  const res = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(validatedCredentials),
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
    },
  });
  if (res.ok) return { email: validatedCredentials.email };
  throw new CredentialsSignin('Password or email is incorrect');
}
