import React, { FC } from 'react';
import { Button, Grid2 } from '@mui/material';
import { useTranslations } from 'next-intl';
import { CheckIcon, CloseIcon } from '@/assets/icons/icons';

interface IControlPanelProps {
  onSubmit?: () => void;
  onCancel: () => void;
  loading?: boolean;
}

export const ControlPanel: FC<IControlPanelProps> = ({
  onSubmit,
  onCancel,
  loading
}) => {
  const t = useTranslations();
  return (
    <Grid2 container justifyContent='space-between' mt={1}>
      <Button
        type='reset'
        onClick={onCancel}
        startIcon={<CloseIcon />}
        color='secondary'
      >
        {t('actions.cancel')}
      </Button>
      <Button type='submit' endIcon={<CheckIcon />} loading={loading} loadingPosition='end' onClick={onSubmit}>
        {t('actions.confirm')}
      </Button>
    </Grid2>
  );
};
