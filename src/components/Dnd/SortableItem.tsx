import React, { FC, memo } from 'react';
import { useParams } from 'next/navigation';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Grid2, Grow, Paper, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import { DeleteIcon, EditIcon } from '@/assets/icons/icons';
import { useSwitch } from '@/lib/utils/hooks/useSwitch';
import {
  useGetRetrospectiveDetailsQuery,
  useUpdateRetrospectiveMutation,
} from '@/store/api/retrospectivesEndpoints/retrospectivesEndpoints';
import { ActionMenu } from '../ActionMenu/ActionMenu';
import { ESortableItems } from './constants';
import { ItemForm } from '../ItemForm/ItemForm';
import { ISortableItem } from './types';

export const SortableItem: FC<ISortableItem> = memo((props) => {
  const [isEditMode, openEditMode, closeEditMode] = useSwitch();

  const {
    id,
    content: { text },
    disabled,
  } = props;

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
    disabled: disabled || isEditMode,
    data: {
      type: ESortableItems.item,
      item: props,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const t = useTranslations();

  const { id: retrospectiveId } = useParams();
  const { data: retrospective } = useGetRetrospectiveDetailsQuery(
    retrospectiveId as string
  );

  const [updateRetrospective, { isLoading: isUpdating }] =
    useUpdateRetrospectiveMutation();

  const handleDeleteItem = async () => {
    if (retrospective) {
      try {
        await updateRetrospective({
          _id: retrospectiveId as string,
          data: {
            containers: retrospective.data.containers,
            items: [...retrospective.data.items].filter(
              (item) => item.id !== id
            ),
          },
        }).unwrap();
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleUpdateRetrospective = async (values: { contentText: string }) => {
    try {
      if (retrospective) {
        const updatedItems = retrospective.data.items.map((item) =>
          item.id === id
            ? { ...item, content: { text: values.contentText } }
            : item
        );
        await updateRetrospective({
          _id: retrospectiveId as string,
          data: {
            containers: retrospective.data.containers,
            items: updatedItems,
          },
        }).unwrap();
        closeEditMode();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Grow in>
      {isEditMode ? (
        <ItemForm
          initialValue={text}
          onCancel={closeEditMode}
          onConfirm={handleUpdateRetrospective}
        />
      ) : (
        <Paper
          ref={setNodeRef}
          {...attributes}
          {...listeners}
          style={style}
          elevation={2}
          sx={{
            p: 1,
            cursor: disabled ? 'auto' : isDragging ? 'grabbing' : 'grab',
            borderRadius: 3,
            flexShrink: 0,
            opacity: isDragging ? '50%' : '100%',
          }}
        >
          <Typography sx={{ wordBreak: 'break-all' }}>{text}</Typography>
          <Grid2 container justifyContent='end'>
            {!disabled && (
              <ActionMenu
                options={[
                  {
                    title: t('actions.edit'),
                    action: openEditMode,
                    icon: <EditIcon />,
                    disabled: isUpdating,
                  },
                  {
                    title: t('actions.delete'),
                    action: handleDeleteItem,
                    icon: <DeleteIcon />,
                    loading: isUpdating,
                  },
                ]}
              />
            )}
          </Grid2>
        </Paper>
      )}
    </Grow>
  );
});
