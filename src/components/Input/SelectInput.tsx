import React, { FC } from 'react';
import {
  FormHelperText,
  Grid2,
  Select,
  SelectProps,
  Typography,
} from '@mui/material';
import { grey } from '../Providers/ThemeProvider/colors';

type TSelectInputProps = SelectProps & { helperText?: string };

export const SelectInput: FC<TSelectInputProps> = ({
  children,
  label,
  disabled,
  error,
  helperText,
  ...props
}) => (
  <Grid2>
    <Typography
      component='label'
      color={disabled ? 'textDisabled' : error ? 'error' : grey[600]}
      variant='caption'
      sx={{ textTransform: 'capitalize' }}
      ml={1}
    >
      {label}
    </Typography>
    <Select
      {...props}
      fullWidth
      error={error}
      MenuProps={{
        PaperProps: {
          sx: {
            mt: 1,
          },
        },
      }}
    >
      {children}
    </Select>
    <FormHelperText sx={{ margin: '3px 14px 0px' }} error={error}>
      {helperText}
    </FormHelperText>
  </Grid2>
);
