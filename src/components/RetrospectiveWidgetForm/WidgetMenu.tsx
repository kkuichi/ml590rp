import React, { FC } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { IconButton } from '@mui/material';
import { useTranslations } from 'next-intl';
import { DeleteIcon, EditIcon, SettingsIcon } from '@/assets/icons/icons';
import { ERoutes } from '@/lib/constants/routes';
import { useDeleteRetrospectiveMutation } from '@/store/api/retrospectivesEndpoints/retrospectivesEndpoints';
import { ActionMenu } from '../ActionMenu/ActionMenu';


interface IRetrospectiveMenuProps {
  openEditMode: () => void;
  disabled:boolean
}

export const WidgetMenu: FC<IRetrospectiveMenuProps> = ({openEditMode,disabled}) => {
  const router = useRouter();
  const { id: retrospectiveId } = useParams();

  const t = useTranslations();

  const [deleteRetrospective, { isLoading: isDeleting }] =
    useDeleteRetrospectiveMutation();

  const handleDelete = async () => {
    if (retrospectiveId) {
      try {
        await deleteRetrospective(retrospectiveId as string).unwrap();
        router.replace(ERoutes.retrospectives);
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <>
      <IconButton disabled={disabled} onClick={openEditMode}>
        <EditIcon />
      </IconButton>
      <ActionMenu
        
        customIcon={<SettingsIcon />}
        direction='top'
        options={[
          {
            title: t('actions.delete'),
            action: handleDelete,
            icon: <DeleteIcon />,
            loading: isDeleting,
          },
        ]}
      />
    </>
  );
};