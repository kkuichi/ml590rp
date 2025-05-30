import React, { FC } from 'react';
import { Grid2, TextField, TextFieldProps, Typography } from '@mui/material';
import { grey } from '../Providers/ThemeProvider/colors';

interface ITextInputProps extends Omit<TextFieldProps, 'label'> {
  label?: string;
}

export const TextInput: FC<ITextInputProps> = ({
  label,
  disabled,
  error,
  ...props
}) => (
  <Grid2>
    {label && (
      <Typography
        component='label'
        color={error ? 'error' : grey[600]}
        variant='caption'
        ml={1}
      >
        {label}
      </Typography>
    )}
    <TextField
      disabled={disabled}
      error={error}
      placeholder={label}
      fullWidth
      {...props}
    />
  </Grid2>
);
