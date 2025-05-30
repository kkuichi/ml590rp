'use client';

import React, { FC } from 'react';
import { Grid2 } from '@mui/material';
import { ERoutes } from '@/lib/constants/routes';
import { useGetSuperviseDetailsQuery } from '@/store/api/retrospectivesEndpoints/retrospectivesEndpoints';
import { MultipleSortableContainer } from '../../Dnd/MultipleSortableContainer';
import { Header } from '../../Page/Header';

interface ISuperviseDetailsContentProps {
  retrospectiveId: string;
}

export const SuperviseDetailsContent: FC<ISuperviseDetailsContentProps> = ({
  retrospectiveId,
}) => {
  const { data: retrospective, isLoading } =
    useGetSuperviseDetailsQuery(retrospectiveId);
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
        backPath={ERoutes.supervise}
        title={retrospective?.title ?? ''}
        tooltip={'Supervise'}
      />
      <Grid2 sx={{ overflowY: 'auto' }} height='100%'>
        {retrospective && (
          <MultipleSortableContainer
            data={retrospective.data}
            loading={isLoading}
            disabled
          />
        )}
      </Grid2>
    </Grid2>
  );
};
