'use server';

import { ICredentials } from '@/types/types';
import { signIn } from '../../config/auth/auth';
import { ERoutes } from '../constants/routes';

export async function signinWithCredentials(
  credentials: ICredentials
): Promise<string> {
  return await signIn('credentials', {
    email: credentials.email,
    password: credentials.password,
    redirect: false,
    redirectTo: ERoutes.dashboard,
  });
}
