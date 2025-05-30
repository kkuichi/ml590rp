import React, { FC } from 'react';
import Link from 'next/link';
import { Grid2, IconButton, Paper } from '@mui/material';
import { NAVIGATION_ITEMS } from './constants';
import { Settings } from './Settings';

interface INavBarProps {
  pathname: string;
}

export const NavigationBar: FC<INavBarProps> = ({ pathname }) => (
  <Paper
    elevation={3}
    sx={{
      display: { xs: 'none', md: 'flex' },
      height: '100hv',
      flexDirection: 'column',
      justifyContent: 'space-between',
      px: 1.5,
      py: 10,
      flexShrink: 0,
      zIndex: 1000,
    }}
  >
    <Grid2 container direction='column' gap={4} alignItems='center'>
      {NAVIGATION_ITEMS.map(({ path, icon, title }) => (
        <Link key={title} href={path}>
          <IconButton color={pathname.includes(path) ? 'primary' : 'secondary'}>
            {icon}
          </IconButton>
        </Link>
      ))}
    </Grid2>
    <Grid2 container>
      <Settings />
    </Grid2>
  </Paper>
);
