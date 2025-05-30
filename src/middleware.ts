import { NextResponse } from 'next/server';
import {
  authRoutes,
  DEFAULT_LOGIN_REDIRECT,
  ERoutes,
  publicRoutes,
} from '@/lib/constants/routes';
import { auth } from './config/auth/auth';
import { UNAUTHORIZED } from './lib/constants/server/responses';

export const config = {
  matcher: ['/((?!api/auth|_next/static|_next/image|favicon.ico).*)'],
};

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = Boolean(req.auth);
  const isApiRoute = nextUrl.pathname.startsWith('/api');
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  switch (true) {
    case isApiRoute:
      return isLoggedIn ? undefined : NextResponse.json(null, UNAUTHORIZED);
    case isAuthRoute || nextUrl.pathname === '/':
      return isLoggedIn
        ? Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
        : undefined;
    case !isLoggedIn && !isPublicRoute:
      return Response.redirect(new URL(ERoutes.signin, nextUrl));
    default:
      return;
  }
});
