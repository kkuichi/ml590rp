import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import authenticate from '@/lib/actions/authenticate';
import { ERoutes } from '../../lib/constants/routes';
import { authorizeCredentials } from './autorizeCredentials';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub,
    Google,
    Credentials({
      credentials: {
        email: { label: 'Email' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: authorizeCredentials,
    }),
  ],
  callbacks: {
    authorized: async ({ auth }) => Boolean(auth),
    async signIn({ user, credentials }) {
      if (credentials) {
        return true;
      }
      return authenticate(user);
    },
  },
  trustHost: true,
  session: { strategy: 'jwt' },
  pages: {
    signIn: ERoutes.signin,
    error: ERoutes.signin,
  },
});
