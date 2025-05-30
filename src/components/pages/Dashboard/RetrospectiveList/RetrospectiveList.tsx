import React, { FC } from 'react';
import { Link, Paper, Skeleton, Typography } from '@mui/material';
import { format } from 'date-fns';
import { useTranslations } from 'next-intl';
import { ddMMyyyyFormat } from '@/lib/constants/dateFormats';
import {
  getRetrospectivePath,
  getSupervisedRetrospectivePath,
} from '@/lib/utils/getRetrospectivePath';
import { IRetrospectiveItemProps, IRetrospectiveListProps } from './types';

const RetrospectiveItem: FC<IRetrospectiveItemProps> = ({
  data,
  supervised,
}) => (
  <Link
    href={
      supervised
        ? getSupervisedRetrospectivePath(data)
        : getRetrospectivePath(data)
    }
    display='flex'
    justifyContent='space-between'
  >
    <Typography fontSize={18}>{data.title}</Typography>
    <Typography fontSize={18}>
      {format(data.creationDate, ddMMyyyyFormat)}
    </Typography>
  </Link>
);

export const RetrospectiveList: FC<IRetrospectiveListProps> = ({
  retrospectives,
  isLoading,
  supervised,
}) => {
  const t = useTranslations();
  const height = 16 * 2 + 29 * 3 + 24 * 2;
  return (
    <Paper
      variant='outlined'
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        p: 2,
        borderRadius: 3,
        height,
      }}
    >
      {isLoading ? (
        <>
          <Skeleton variant='rounded' width='100%' height={29} />
          <Skeleton variant='rounded' width='100%' height={29} />
          <Skeleton variant='rounded' width='100%' height={29} />
        </>
      ) : retrospectives?.length ? (
        retrospectives.map((item) => (
          <RetrospectiveItem
            supervised={supervised}
            key={item._id}
            data={item}
          />
        ))
      ) : (
        <Typography
          sx={{
            opacity: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          flex={1}
        >
          {t('pages.dashboard.noRetrospectives')}
        </Typography>
      )}
    </Paper>
  );
};
