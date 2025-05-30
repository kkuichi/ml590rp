import React, { FC } from 'react';
import { Grid2, Paper, Typography } from '@mui/material';
import { ActionMenu } from '@/components/ActionMenu/ActionMenu';
import { ISortableItem } from '../types';

export const SortableItemOverlay: FC<Omit<ISortableItem, 'disabled'>> = ({
  content: { text },
}) => (
  <Paper
    elevation={2}
    sx={{
      p: 1,
      cursor: 'grabbing',
      borderRadius: 3,
      flexShrink: 0,
      position: 'absolute',
      zIndex: 2000,
      width: 283,
      border: ({ palette }) => `1px dashed ${palette.primary.main}`,
    }}
  >
    <Typography sx={{ wordBreak: 'break-all' }}>{text}</Typography>
    <Grid2 container justifyContent='end'>
      <ActionMenu options={[]} />
    </Grid2>
  </Paper>
);
