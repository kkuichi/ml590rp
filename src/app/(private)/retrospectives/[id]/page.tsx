import React, { FC, use } from 'react';
import { Grid2 } from '@mui/material';
import { RetrospectiveDetailsContent } from '@/components/pages/RetrospectiveDetails/RetrospectiveDetailsContent';
import { RetrospectiveDetailsWidget } from '@/components/pages/RetrospectiveDetails/Widget/RetrospectiveDetailsWidget';

interface IPageProps {
  params: Promise<{
    id: string;
  }>;
}

const RetrospectiveDetailsPage: FC<IPageProps> = ({ params }) => {
  const { id } = use(params);
  return (
    <Grid2
      container
      direction={{ xs: 'column', md: 'row' }}
      wrap='nowrap'
      height={{ xs: 'auto', md: '100%' }}
      gap={1}
      position='relative'
    >
      <RetrospectiveDetailsContent retrospectiveId={id} />
      <RetrospectiveDetailsWidget retrospectiveId={id!} />
    </Grid2>
  );
};

export default RetrospectiveDetailsPage;
