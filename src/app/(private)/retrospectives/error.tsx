'use client';

import { useEffect } from 'react';
import { Button, Grid2, Stack, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import { ErrorIcon, FollowLinkIcon, RefreshIcon } from '@/assets/icons/icons';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const t = useTranslations();
  useEffect(() => {
    console.error(error);
  }, [error]);

  if (process.env.NODE_ENV !== 'production') {
    throw error;
  }
  return (
    <Grid2 container direction='column' gap={2} m='auto'>
      <Typography variant='h2' color='error' display='flex' alignItems='end'>
        {t('errors.error')} <ErrorIcon />
      </Typography>
      <Stack spacing={2}>
        <Button size='large' onClick={reset} endIcon={<RefreshIcon />}>
          {t('errors.tryAgain')}
        </Button>
        <Button
          href='/dashboard'
          color='secondary'
          size='large'
          endIcon={<FollowLinkIcon />}
        >
          {t('errors.goHome')}
        </Button>
      </Stack>
    </Grid2>
  );
}
