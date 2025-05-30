import React from 'react';
import { useTranslations } from 'next-intl';
import { Header } from '@/components/Page/Header';
import { DashboardContent } from '@/components/pages/Dashboard/DashboardContent';

const DashboardPage = () => {
  const t = useTranslations();
  return (
    <>
      <Header
        title={t('pages.dashboard.title')}
        tooltip={t('pages.dashboard.title')}
      />
      <DashboardContent />
    </>
  );
};

export default DashboardPage;
