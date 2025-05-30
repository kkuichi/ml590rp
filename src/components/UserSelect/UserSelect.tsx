'use client';

import React, { FC, memo, ReactNode, useState } from 'react';
import { Control, Controller } from 'react-hook-form';
import {
  Autocomplete,
  FormControl,
  FormHelperText,
  Grid2,
  TextField,
} from '@mui/material';
import { useTranslations } from 'next-intl';
import { IOption } from '@/types/types';

interface IUserSelectProps {
  loadOptions: (inputValue: string) => Promise<Array<IOption>>;
  name: string;
  disabled?: boolean;
  button?: ReactNode;
  control: Control;
}

export const UserSelect: FC<IUserSelectProps> = memo(
  ({ loadOptions, name, disabled, control, button }) => {
    const t = useTranslations();
    const [options, setOptions] = useState<Array<IOption>>([]);
    return (
      <Controller
        name={name}
        disabled={disabled}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <FormControl error={Boolean(error)}>
            <Grid2 container wrap='nowrap' alignItems='center' gap={1}>
              <Autocomplete
                {...field}
                options={options}
                fullWidth
                onChange={(_, value) => field.onChange(value)}
                onInputChange={async (_, value, reason) => {
                  if (reason === 'clear' || reason === 'input') {
                    setOptions(await loadOptions(value));
                  }
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    error={Boolean(error)}
                    size='small'
                    placeholder={t('common.email')}
                  />
                )}
              />
              {!field.disabled && button}
            </Grid2>
            <FormHelperText>{error?.message}</FormHelperText>
          </FormControl>
        )}
      />
    );
  }
);
