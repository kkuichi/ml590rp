import { useParams } from 'next/navigation';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Grid2, Grow, IconButton, Typography } from '@mui/material';
import { nanoid } from '@reduxjs/toolkit';
import { useTranslations } from 'next-intl';
import { PlusIcon } from '@/assets/icons/icons';
import { useSwitch } from '@/lib/utils/hooks/useSwitch';
import {
  useGetRetrospectiveDetailsQuery,
  useUpdateRetrospectiveMutation,
} from '@/store/api/retrospectivesEndpoints/retrospectivesEndpoints';
import { ItemForm } from '../ItemForm/ItemForm';
import { ESortableItems } from './constants';
import { ISortableContainer } from './types';

export const SortableContainer: React.FC<ISortableContainer> = ({
  children,
  disabled,
  ...props
}) => {
  const { id, title } = props;

  const [isEditMode, openEditMode, closeEditMode] = useSwitch(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
    disabled: isEditMode || disabled,
    data: {
      type: ESortableItems.container,
      container: props,
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
  const [updateRetrospective] = useUpdateRetrospectiveMutation();

  const handleUpdateRetrospective = async (values: { contentText: string }) => {
    try {
      if (retrospective) {
        await updateRetrospective({
          _id: retrospectiveId as string,
          data: {
            containers: retrospective.data.containers,
            items: [
              ...retrospective.data.items,
              {
                containerId: id,
                content: {
                  text: values.contentText,
                },
                id: nanoid(),
              },
            ],
          },
        }).unwrap();
        closeEditMode();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Grid2
      ref={setNodeRef}
      width='300px'
      container
      height='100%'
      direction='column'
      wrap='nowrap'
      flexShrink={0}
      bgcolor='beige.200'
      sx={{
        ...style,
        opacity: isDragging ? '50%' : '100%',
        '&:not(:first-child)': { borderLeft: '1px solid white' },
      }}
    >
      <Grid2
        {...attributes}
        {...listeners}
        {...setActivatorNodeRef}
        container
        p={{ xs: 0.5, md: 2 }}
        bgcolor='beige.300'
        wrap='nowrap'
        alignItems='center'
        justifyContent='space-between'
        position='sticky'
        top={0}
        zIndex={1000}
        sx={{ cursor: disabled ? 'auto' : 'grab' }}
      >
        <Typography>{t(title)}</Typography>
        {!disabled && (
          <IconButton onClick={openEditMode}>
            <PlusIcon />
          </IconButton>
        )}
      </Grid2>
      <Grid2
        container
        direction='column'
        p={1}
        wrap='nowrap'
        width='100%'
        height='fit-content'
        gap={0.5}
      >
        {children}
        <Grow in={isEditMode} unmountOnExit>
          <ItemForm
            onCancel={closeEditMode}
            onConfirm={handleUpdateRetrospective}
          />
        </Grow>
      </Grid2>
    </Grid2>
  );
};
