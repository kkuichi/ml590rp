import React, { FC } from 'react';
import { Box, Paper } from '@mui/material';
import { MobileNavigationPopup } from './MobileNavigationPopup';

interface INavBarProps {
  pathname: string;
}

export const MobileNavigationBar: FC<INavBarProps> = ({ pathname }) => (
  <Paper
    elevation={3}
    sx={{
      display: { xs: 'flex', md: 'none' },
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      zIndex: 1000,
      p: 1,
      borderRadius: 3,
      m: 0.75,
    }}
  >
    <Box display='flex' gap={1} alignItems='center'>
      <MobileNavigationPopup pathname={pathname} />
    </Box>
  </Paper>
);
