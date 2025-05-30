import React from 'react';
import { useTranslations } from 'next-intl';
import { Header } from '@/components/Page/Header';
import { SuperviseContent } from '@/components/pages/Supervise/SuperviseContent';


const RetrospectivesPage = () => {
  const t = useTranslations();
  return (
    <>
      <Header
        title={t('pages.retrospectives.title')}
        tooltip={t('pages.retrospectives.title')}
      />
      <SuperviseContent />
    </>
  );
};

export default RetrospectivesPage;