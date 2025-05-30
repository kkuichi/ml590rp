import React from 'react';
import Link from 'next/link';
import { Button, Grid2, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import { FollowLinkIcon } from '@/assets/icons/icons';
import { ERoutes } from '@/lib/constants/routes';
import { CreateRetrospectiveModal } from '../../Modal/CreateRetrospectiveModal';
import { RetrospectiveListWrapper } from './RetrospectiveList/RetrospectiveListWrapper';

export const DashboardContent = () => {
  const t = useTranslations();
  return (
    <Grid2
      container
      direction={{ xs: 'column', md: 'row' }}
      spacing={{ xs: 2, md: 4 }}
      p={{ xs: 2, md: 4 }}
    >
      <Grid2
        container
        direction='column'
        gap={{ xs: 1, md: 2 }}
        size={{ xs: 12, md: 6 }}
      >
        <Typography variant='subtitle1'>
          {t('pages.dashboard.headings.prevRetrospectives')}
        </Typography>
        <RetrospectiveListWrapper supervised={false} />
        <Grid2 container gap={2}>
          <Link href={ERoutes.retrospectives}>
            <Button endIcon={<FollowLinkIcon />}>{t('actions.viewAll')}</Button>
          </Link>
          <CreateRetrospectiveModal />
        </Grid2>
      </Grid2>
      <Grid2
        container
        direction='column'
        gap={{ xs: 1, md: 2 }}
        size={{ xs: 12, md: 6 }}
      >
        <Typography variant='subtitle1'>
          {t('pages.dashboard.headings.supervisedRetrospectives')}
        </Typography>
        <RetrospectiveListWrapper supervised />
        <Grid2 container gap={2}>
          <Link href={ERoutes.supervise}>
            <Button endIcon={<FollowLinkIcon />}>{t('actions.viewAll')}</Button>
          </Link>
        </Grid2>
      </Grid2>
    </Grid2>
  );
};
