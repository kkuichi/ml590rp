import React, { FC, memo, ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  FormControl,
  FormHelperText,
  Grid2,
  IconButton,
  InputBase,
  Paper,
  PaperProps,
} from '@mui/material';
import { useTranslations } from 'next-intl';
import { object, string } from 'yup';
import { CheckIcon, CloseIcon } from '@/assets/icons/icons';

interface IItemFormProps extends PaperProps {
  initialValue?: string;
  onConfirm: (values: { contentText: string }) => unknown;
  onCancel: () => void;
  ActionMenu?: ReactNode;
  editMode?: boolean;
}

const itemFormSchema = object({
  contentText: string().trim().required(),
});

export const ItemForm: FC<IItemFormProps> = memo(
  ({
    initialValue = '',
    onConfirm,
    onCancel,
    ActionMenu,
    sx,
    editMode = true,
    ...paperProps
  }) => {
    const {
      register,
      handleSubmit,
      reset,
      formState: { errors, isSubmitting },
    } = useForm({
      disabled: !editMode,
      defaultValues: {
        contentText: initialValue,
      },
      resolver: yupResolver(itemFormSchema),
      shouldUnregister: true,
    });

    const t = useTranslations();

    const handleReset = () => {
      reset({
        contentText: initialValue,
      });
      onCancel();
    };

    return (
      <Paper
        component='form'
        elevation={2}
        onSubmit={handleSubmit(onConfirm)}
        sx={{
          p: 1,
          borderRadius: 3,
          flexShrink: 0,
          ...sx,
        }}
        {...paperProps}
      >
        <FormControl fullWidth error={Boolean(errors.contentText)}>
          <InputBase
            {...register('contentText')}
            sx={{ p: 0 }}
            autoFocus
            multiline
            fullWidth
            placeholder={t('forms.placeholders.empty')}
          />
          <Grid2 container justifyContent='space-between'>
            <FormHelperText>{errors.contentText?.message}</FormHelperText>
            <Grid2 container justifyContent='end'>
              {editMode || !ActionMenu ? (
                <>
                  <IconButton size='small' onClick={handleReset}>
                    <CloseIcon />
                  </IconButton>
                  <IconButton loading={isSubmitting} size='small' type='submit'>
                    <CheckIcon />
                  </IconButton>
                </>
              ) : (
                ActionMenu
              )}
            </Grid2>
          </Grid2>
        </FormControl>
      </Paper>
    );
  }
);
