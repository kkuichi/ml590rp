import React, { FC, PropsWithChildren } from 'react';
import { Grid2, Paper } from '@mui/material';
import { NavigationBarWrapper } from '@/components/NavigationBar/NavigationBarWrapper';

const PrivateLayout: FC<PropsWithChildren> = ({ children }) => (
  <Grid2
    container
    direction={{ xs: 'column', md: 'row' }}
    height='100dvh'
    minHeight='100dvh'
    width='100%'
    bgcolor='grey.200'
    wrap='nowrap'
    position={{ xs: 'relative', md: 'static' }}
  >
    <NavigationBarWrapper />
    <Paper
      elevation={3}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        m: { xs: 0.75, md: 1.5 },
        borderRadius: { xs: 3, md: 5 },
        overflow: { xs: 'auto', md: 'hidden' },
        p: 1,
        gap: { xs: 2, md: 5 },
        justifyContent: { xs: 'space-between', md: 'unset' },
      }}
    >
      {children}
    </Paper>
  </Grid2>
);

export default PrivateLayout;
