'use client';

import React from 'react';
import { IconButton } from '@mui/material';
import { DarkModeIcon, LightModeIcon } from '@/assets/icons/icons';
import { useThemeSwitcher } from '../Providers/ThemeProvider/ThemeProvider';

export const ThemeSwitcher = () => {
  const { mode, toggleTheme } = useThemeSwitcher();

  return (
    <IconButton onClick={toggleTheme}>
      {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
    </IconButton>
  );
};
