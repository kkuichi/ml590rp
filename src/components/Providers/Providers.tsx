'use client';

import { SessionProvider } from 'next-auth/react';
import { Provider as ReduxProvider } from 'react-redux';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { store } from '@/store';
import { MUIThemeProvider } from './ThemeProvider/ThemeProvider';

export const Providers = ({ children }: { children: React.ReactNode }) => (
  <AppRouterCacheProvider>
    <SessionProvider>
      <ReduxProvider store={store}>
        <MUIThemeProvider>{children}</MUIThemeProvider>
      </ReduxProvider>
    </SessionProvider>
  </AppRouterCacheProvider>
);
