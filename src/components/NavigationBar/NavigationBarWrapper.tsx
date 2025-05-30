'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { MobileNavigationBar } from './MobileNavigationBar';
import { NavigationBar } from './NavigationBar';

export const NavigationBarWrapper = () => {
  const pathname = usePathname();
  return (
    <>
      <MobileNavigationBar pathname={pathname} />
      <NavigationBar pathname={pathname} />
    </>
  );
};
