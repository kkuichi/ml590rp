import React from 'react';
import { Grid2 } from '@mui/material';
import { useTranslations } from 'next-intl';
import { CreateRetrospectiveModal } from '@/components/Modal/CreateRetrospectiveModal';
import { Header } from '@/components/Page/Header';
import { RetrospectivesContent } from '@/components/pages/Retrospectives/RetrospectivesContent';

const RetrospectivesPage = () => {
  const t = useTranslations();
  return (
    <>
      <Header
        title={t('pages.retrospectives.title')}
        tooltip={t('pages.retrospectives.title')}
      />
      <Grid2
        container
        direction='column'
        wrap='nowrap'
        gap={3}
        p={{ md: 4 }}
        height='100%'
        overflow='hidden'
      >
        <Grid2 container>
          <CreateRetrospectiveModal />
        </Grid2>
        <RetrospectivesContent />
      </Grid2>
    </>
  );
};

export default RetrospectivesPage;
