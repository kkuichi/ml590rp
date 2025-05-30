import { Grid2, IconButton, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import { PlusIcon } from '@/assets/icons/icons';
import { ISortableContainer } from '../types';

export const SortableContainerOverlay: React.FC<ISortableContainer> = ({
  disabled,
  title,
}) => {
  const t = useTranslations();

  return (
    <Grid2
      container
      p={2}
      width={300}
      bgcolor='beige.300'
      wrap='nowrap'
      justifyContent='space-between'
      alignItems='center'
      borderRadius={4}
      border={({ palette }) => `1px dashed ${palette.primary.main}`}
      sx={{cursor:'grabbing'}}
    >
      <Typography>{t(title)}</Typography>
      {!disabled && (
        <IconButton>
          <PlusIcon />
        </IconButton>
      )}
    </Grid2>
  );
};
