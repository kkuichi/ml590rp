import React, { FC } from 'react';
import { Grid2, Switch, SwitchProps, Typography } from '@mui/material';
import { grey } from '../Providers/ThemeProvider/colors';

interface ISwitchInputProps extends SwitchProps {
  label: string;
}

export const SwitchInput: FC<ISwitchInputProps> = ({ label, ...props }) => (
  <Grid2 container direction='column'>
    <Typography variant='caption' color={grey[600]} ml={1}>{label}</Typography>
    <Switch
      {...props}
      sx={{
        '& .MuiSwitch-switchBase.Mui-checked': {
          color: '#21076D',
        },
      }}
    />
  </Grid2>
);
