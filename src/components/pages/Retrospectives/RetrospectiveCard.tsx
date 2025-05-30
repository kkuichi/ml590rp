import React, { FC } from 'react';
import { ButtonBase, Divider, Grid2, Paper, Typography } from '@mui/material';
import { format } from 'date-fns';
import { useTranslations } from 'next-intl';
import { ddMMyyyyFormat } from '@/lib/constants/dateFormats';
import { getRetrospectivePath } from '@/lib/utils/getRetrospectivePath';
import { IRetrospective } from '@/types/types';

interface IRetrospectiveCardProps {
  data: IRetrospective;
}

export const RetrospectiveCard: FC<IRetrospectiveCardProps> = ({ data }) => {
  const t = useTranslations();
  return (
    <ButtonBase
      href={getRetrospectivePath(data)}
      sx={{ borderRadius: 2 }}
      style={{ width: '100%' }}
    >
      <Paper
        variant='outlined'
        sx={{
          width: '100%',
          height: 200,
          borderRadius: 2,
          display: 'flex',
          padding: 1,
          flexDirection: 'column',
          gap: 1,
        }}
      >
        <Grid2 container width='100%' justifyContent='space-between'>
          <Typography>{data.title}</Typography>
          <Typography>{format(data.creationDate, ddMMyyyyFormat)}</Typography>
        </Grid2>
        <Divider />
        <Grid2 container flex={1}>
          {data.description ? (
            <Typography
              sx={{
                display: '-webkit-box',
                WebkitLineClamp: 6,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                wordBreak: 'break-word',
              }}
            >
              {data.description}
            </Typography>
          ) : (
            <Typography
              component='span'
              sx={{
                width: '100%',
                opacity: '50%',
                textAlign: 'center',
                alignSelf: 'center',
              }}
            >
              {data.completed
                ? t('common.noDescription')
                : t('common.notCompleted')}
            </Typography>
          )}
        </Grid2>
      </Paper>
    </ButtonBase>
  );
};
