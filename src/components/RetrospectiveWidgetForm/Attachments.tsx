import React from 'react';
import { useParams } from 'next/navigation';
import { Grid2, Grow, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useSwitch } from '@/lib/utils/hooks/useSwitch';
import {
  useCreateCommentMutation,
  useGetCommentsQuery,
} from '@/store/api/commentsEndpoints/commentsEndpoints';
import { ItemForm } from '../ItemForm/ItemForm';
import { CommentCard } from './CommentCard';

export const Attachments = () => {
  const t = useTranslations();
  const { id: retrospectiveId } = useParams();

  const { data } = useGetCommentsQuery(retrospectiveId as string);
  const [editMode, openEditMode, closeEditMode] = useSwitch();
  const [createComment] = useCreateCommentMutation();

  const handleCreateComment = async (values: { contentText: string }) => {
    try {
      await createComment({
        retrospectiveId: retrospectiveId as string,
        text: values.contentText,
      }).unwrap();
      closeEditMode();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Grid2
      container
      direction='column'
      p={1}
      gap={1}
      width='100%'
      height='100%'
      overflow='auto'
    >
      {
        <Grid2 container direction='column' gap={1}>
          <Typography ml={1} variant='caption'>
            {t('pages.retrospectiveDetails.comments')}
          </Typography>
          <Grid2 container direction='column' gap={2}>
            {data?.length
              ? data.map((comment) => (
                  <CommentCard key={comment._id} data={comment} />
                ))
              : !editMode && (
                  <Typography sx={{ opacity: '50%', ml: 1 }} variant='body2'>
                    {t('pages.retrospectiveDetails.noComments')}
                  </Typography>
                )}
          </Grid2>
          {!editMode && (
            <Typography
              onClick={openEditMode}
              sx={{ ml: 1, cursor: 'pointer' }}
              variant='caption'
            >
              {t('actions.add')}
            </Typography>
          )}
          <Grow in={editMode} unmountOnExit>
            <Grid2 container direction='column' width='100%' mt={1}>
              <Typography ml={1} variant='caption'>
                {t('common.you')}
              </Typography>
              <ItemForm
                onConfirm={handleCreateComment}
                onCancel={closeEditMode}
                variant='outlined'
              />
            </Grid2>
          </Grow>
        </Grid2>
      }
    </Grid2>
  );
};
