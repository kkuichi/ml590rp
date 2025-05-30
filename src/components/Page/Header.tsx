import React, { FC } from 'react';
import Link from 'next/link';
import { Box, IconButton, Paper, Tooltip, Typography } from '@mui/material';
import { BackArrowIcon, InfoIcon } from '@/assets/icons/icons';
import { Logo } from '../Logo/Logo';

interface IHeaderProps {
  title: string;
  tooltip: string;
  backPath?: string;
}

export const Header: FC<IHeaderProps> = ({ title, tooltip, backPath }) => (
  <Paper
    variant='outlined'
    sx={{
      width: '100%',
      borderRadius: { xs: 5, md: 8 },
      px: { xs: 1.5, md: 3 },
      py: { xs: 1, md: 2 },
      display: 'grid',
      gridTemplateColumns: '1fr 2fr 1fr',
      alignItems: 'center',
      justifyItems: 'center',
      height: { xs: 'auto', md: 66 },
      order: { xs: 10, md: 'unset' },
      zIndex: 1000,
    }}
  >
    <Box display='flex' width='100%' justifyContent='start'>
      {backPath ? (
        <Link href={backPath}>
          <IconButton size='small' color='secondary'>
            <BackArrowIcon />
          </IconButton>
        </Link>
      ) : (
        <Logo variant='h5' />
      )}
    </Box>

    <Box>
      <Typography variant='subtitle1'>{title}</Typography>
    </Box>
    <Box display='flex' width='100%' justifyContent='end'>
      <Tooltip title={tooltip}>
        <InfoIcon size={25} />
      </Tooltip>
    </Box>
  </Paper>
);
