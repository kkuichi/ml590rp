import React, { FC, use } from 'react';
import { Grid2 } from '@mui/material';
import { SuperviseDetailsContent } from '@/components/pages/SuperviseDetails/SuperviseDetailsContent';
import { SuperviseDetailsWidget } from '@/components/pages/SuperviseDetails/Widget/SuperviseDetailsWidget';

interface IPageProps {
  params: Promise<{
    id: string;
  }>;
}

const SuperviseDetailsPage: FC<IPageProps> = ({ params }) => {
  const { id } = use(params);
  return (
    <Grid2
      container
      direction={{ xs: 'column', md: 'row' }}
      wrap='nowrap'
      height='100%'
      gap={1}
    >
      <SuperviseDetailsContent retrospectiveId={id} />
      <SuperviseDetailsWidget retrospectiveId={id} />
    </Grid2>
  );
};

export default SuperviseDetailsPage;
