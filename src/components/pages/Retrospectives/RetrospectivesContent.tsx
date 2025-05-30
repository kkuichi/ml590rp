'use client';

import React from 'react';
import { Grid2, Paper, Skeleton, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import { renderSkeletons } from '@/lib/utils/renderSkeletons';
import { useGetRetrospectivesQuery } from '@/store/api/retrospectivesEndpoints/retrospectivesEndpoints';
import { RetrospectiveCard } from './RetrospectiveCard';

export const RetrospectivesContent = () => {
  const { data: retrospectives, isLoading } = useGetRetrospectivesQuery({});
  const t = useTranslations();

  if (!retrospectives?.length && !isLoading) {
    return (
      <Grid2 container flex={1}>
        <Paper variant='outlined' sx={{ p: 5, borderRadius: 5, m: 'auto' }}>
          <Typography sx={{ opacity: '50%' }}>
            {t('pages.dashboard.noRetrospectives')}
          </Typography>
        </Paper>
      </Grid2>
    );
  }

  return (
    <Grid2
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        placeContent: 'start',
        gap: { xs: 1, md: 2 },
        alignItems: 'start',
        overflowY: 'auto',
        gridAutoRows: '200px',
      }}
    >
      {!isLoading && retrospectives
        ? retrospectives.map((retrospective) => (
            <RetrospectiveCard key={retrospective._id} data={retrospective} />
          ))
        : renderSkeletons(
            6,
            <Skeleton variant='rounded' height={200} sx={{ borderRadius: 2 }} />
          )}
    </Grid2>
  );
};
