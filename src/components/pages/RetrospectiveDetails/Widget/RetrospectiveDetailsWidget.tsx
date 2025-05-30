'use client';

import React, { FC, memo } from 'react';
import { Paper, Tab, Tabs } from '@mui/material';
import { useTranslations } from 'next-intl';
import { RETROSPECTIVE_WIDGET_TABS } from '@/components/RetrospectiveWidgetForm/retrospectiveWidgetTabs';
import { TabPanel } from '@/components/TabPanel/TabPanel';
import { useTabs } from '@/lib/utils/hooks/useTabs';
import { IRetrospectiveDetailsContentProps } from './types';

export const RetrospectiveDetailsWidget: FC<IRetrospectiveDetailsContentProps> =
  memo(() => {
    const [activeTab, changeTab] = useTabs(0);
    const t = useTranslations();
    return (
      <Paper
        variant='outlined'
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flexShrink: 0,
          width: { xs: '100%', md: 400 },
          height: { xs: '80vh', md: '100%' },
          borderRadius: 5,
          overflow: 'hidden',
        }}
      >
        <Tabs value={activeTab} onChange={changeTab}>
          {RETROSPECTIVE_WIDGET_TABS.map(({ label }, i) => (
            <Tab sx={{ flex: 1 }} key={label} label={t(label)} value={i} />
          ))}
        </Tabs>
        {RETROSPECTIVE_WIDGET_TABS.map(({ content, label }, i) => (
          <TabPanel key={label} value={activeTab} index={i}>
            {content()}
          </TabPanel>
        ))}
      </Paper>
    );
  });
