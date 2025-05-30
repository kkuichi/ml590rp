import { useSession } from 'next-auth/react';
import React, { FC, memo } from 'react';
import { Grid2, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useSwitch } from '@/lib/utils/hooks/useSwitch';
import {
  useDeleteCommentMutation,
  useUpdateCommentMutation,
} from '@/store/api/commentsEndpoints/commentsEndpoints';
import { IComment } from '@/types/types';
import { ActionMenu } from '../ActionMenu/ActionMenu';
import { ItemForm } from '../ItemForm/ItemForm';

interface ICommentCardProps {
  data: IComment;
}

export const CommentCard: FC<ICommentCardProps> = memo(({ data }) => {
  const session = useSession();
  const email = session.data?.user?.email;

  const t = useTranslations();
  const [editMode, openEditMode, closeEditMode] = useSwitch();
  const [updateComment] = useUpdateCommentMutation();
  const [deleteComment, { isLoading: isDeleting }] = useDeleteCommentMutation();

  const handleUpdateComment = async (values: { contentText: string }) => {
    try {
      await updateComment({
        retrospectiveId: data.retrospectiveId,
        commentId: data._id,
        text: values.contentText,
      }).unwrap();
      closeEditMode();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteComment = async () => {
    try {
      await deleteComment({
        retrospectiveId: data.retrospectiveId,
        commentId: data._id,
      }).unwrap();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Grid2 container direction='column' width='100%'>
      <Typography ml={1} variant='caption'>
        {data.author}
      </Typography>
      <ItemForm
        key={data._id}
        initialValue={data.text}
        onConfirm={handleUpdateComment}
        onCancel={closeEditMode}
        variant='outlined'
        editMode={editMode}
        ActionMenu={
          <ActionMenu
            disabled={!email || data.author !== email}
            options={[
              { action: openEditMode, title: t('actions.edit') },
              {
                action: handleDeleteComment,
                title: t('actions.delete'),
                loading: isDeleting,
              },
            ]}
          />
        }
      />
    </Grid2>
  );
});
