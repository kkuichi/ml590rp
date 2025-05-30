import React, { FC } from 'react';
import Link from 'next/link';
import { ButtonBase, Divider, Grid2, Paper, Typography } from '@mui/material';
import { format } from 'date-fns';
import { ddMMyyyyFormat } from '@/lib/constants/dateFormats';
import { getSupervisedRetrospectivePath } from '@/lib/utils/getRetrospectivePath';
import { IRetrospective } from '@/types/types';


interface ISuperviseCardProps {
  data: IRetrospective;
}

export const SuperviseCard: FC<ISuperviseCardProps> = ({ data }) => (
  <ButtonBase
    href={getSupervisedRetrospectivePath(data)}
    LinkComponent={Link}
    sx={{ borderRadius: 2, width: '100%' }}
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
      <Grid2 flex={1}>
        <Typography
          sx={{
            textAlign: 'start',
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 6,
            overflow: 'hidden',
          }}
        >
          <Typography component='span' sx={{ opacity: '50%' }}>
            Team
          </Typography>
          <br />
          {data.author}
          <br />
          {data.members.map((member) => (
            <React.Fragment key={member}>
              {member}
              <br />
            </React.Fragment>
          ))}
        </Typography>
      </Grid2>
    </Paper>
  </ButtonBase>
);