'use client';

import React, { FC } from 'react';
import Image, { StaticImageData } from 'next/image';
import { Box, Grid2, Paper } from '@mui/material';
import { MultipleSortableContainer } from '@/components/Dnd/MultipleSortableContainer';
import { IRetrospective } from '@/types/types';

interface IStepProps {
  retrospective: IRetrospective;
  title: string;
  displayedContainer: number;
  content: StaticImageData;
}

export const StepComponent: FC<IStepProps> = ({
  retrospective,
  displayedContainer,
  content,
}) => (
  <Grid2
    container
    wrap='nowrap'
    direction={{ xs: 'column', md: 'row' }}
    height='100%'
    gap={1}
  >
    <Box display='flex' justifyContent='center' flex={{ xs: 1, md: 'unset' }}>
      <MultipleSortableContainer
        loading={false}
        data={retrospective.data}
        displayedContainer={displayedContainer}
      />
    </Box>
    <Paper
      variant='outlined'
      sx={{
        position: 'relative',
        borderRadius: '16px',
        flex: 1,
      }}
    >
      <Image
        alt='content'
        src={content}
        fill
        style={{ borderRadius: '16px' }}
      />
    </Paper>
  </Grid2>
);
