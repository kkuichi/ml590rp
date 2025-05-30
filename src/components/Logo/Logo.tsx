import React, { FC } from 'react';
import { Typography, TypographyProps } from '@mui/material';

export const Logo: FC<TypographyProps> = (props) => (
  <Typography variant='h4' sx={{ color: 'primary.main' }} {...props}>
    Agili
  </Typography>
);
