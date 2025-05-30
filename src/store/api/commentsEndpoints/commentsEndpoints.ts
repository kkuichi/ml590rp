import { ERoutes } from '@/lib/constants/routes';
import { IComment } from '@/types/types';
import { rootApi } from '../rootApi';
import { ICreateComment, IUpdateRetrospective } from './types';

const commentsEndpoints = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    getComments: builder.query<Array<IComment>, string>({
      providesTags: ['COMMENT_CREATION'],
      query: (id) => `${ERoutes.retrospectives}/${id}/comments`,
    }),
    updateComment: builder.mutation<void, IUpdateRetrospective>({
      invalidatesTags: ['COMMENT_CREATION'],
      query: ({ commentId, text, retrospectiveId }) => ({
        url: `${ERoutes.retrospectives}/${retrospectiveId}/comments/${commentId}`,
        method: 'PATCH',
        body: { text },
      }),
    }),
    createComment: builder.mutation<void, ICreateComment>({
      invalidatesTags: ['COMMENT_CREATION'],
      query: ({ retrospectiveId, text }) => ({
        url: `${ERoutes.retrospectives}/${retrospectiveId}/comments`,
        method: 'POST',
        body: { text },
      }),
    }),
    deleteComment: builder.mutation({
      invalidatesTags: ['COMMENT_CREATION'],
      query: ({ commentId, retrospectiveId }) => ({
        url: `${ERoutes.retrospectives}/${retrospectiveId}/comments/${commentId}`,
        method: 'DELETE',
      }),
    }),
  }),
  overrideExisting: 'throw',
});

export const {
  useGetCommentsQuery,
  useUpdateCommentMutation,
  useCreateCommentMutation,
  useDeleteCommentMutation,
} = commentsEndpoints;
