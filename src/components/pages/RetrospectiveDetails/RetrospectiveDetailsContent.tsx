'use client';

import React, { FC } from 'react';
import { Grid2 } from '@mui/material';
import { ERoutes } from '@/lib/constants/routes';
import { useGetRetrospectiveDetailsQuery } from '@/store/api/retrospectivesEndpoints/retrospectivesEndpoints';
import { MultipleSortableContainer } from '../../Dnd/MultipleSortableContainer';
import { Header } from '../../Page/Header';

interface IRetrospectiveDetailsContentProps {
  retrospectiveId: string;
}

export const RetrospectiveDetailsContent: FC<
  IRetrospectiveDetailsContentProps
> = ({ retrospectiveId }) => {
  const { data: retrospective, isLoading } =
    useGetRetrospectiveDetailsQuery(retrospectiveId);
  return (
    <Grid2
      container
      direction={{ xs: 'column-reverse', md: 'column' }}
      wrap='nowrap'
      width='100%'
      height={{ xs: '80vh', md: '100%' }}
      gap={1}
      flexShrink={{ xs: 0, md: 1 }}
    >
      <Header
        backPath={ERoutes.retrospectives}
        title={retrospective?.title ?? ''}
        tooltip={'Retrospective details'}
      />
      <Grid2 sx={{ overflowY: 'auto' }} height='100%'>
        {retrospective && (
          <MultipleSortableContainer
            data={retrospective.data}
            loading={isLoading}
          />
        )}
      </Grid2>
    </Grid2>
  );
};
