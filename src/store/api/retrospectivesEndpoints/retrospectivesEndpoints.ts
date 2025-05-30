import { IRetrospective } from '@/types/types';
import { rootApi } from '../rootApi';
import { ICreateRetrospective, IUpdateRetrospective } from './types';

const retrospectivesApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    createRetrospective: builder.mutation<IRetrospective, ICreateRetrospective>(
      {
        invalidatesTags: ['CREATION'],
        query: (body) => ({
          url: '/retrospectives',
          body,
          method: 'POST',
        }),
      }
    ),
    deleteRetrospective: builder.mutation<void, string>({
      invalidatesTags: ['DELETION'],
      query: (id) => ({
        url: `/retrospectives/${id}`,
        method: 'DELETE',
      }),
    }),
    getRetrospectiveDetails: builder.query<IRetrospective, string>({
      providesTags: (_, __, id) => [{ type: 'EDIT', id }],
      query: (id) => ({
        url: `/retrospectives/${id}`,
      }),
    }),
    getRetrospectives: builder.query<
      Array<IRetrospective>,
      { dashboard?: boolean }
    >({
      providesTags: ['CREATION', 'DELETION', 'EDIT'],
      query: () => ({
        url: '/retrospectives',
      }),
      transformResponse: (
        response: { retrospectives: Array<IRetrospective> },
        _,
        arg
      ) => {
        const { retrospectives } = response;
        if (arg.dashboard) {
          return retrospectives.reverse().slice(0, 3);
        }

        return retrospectives.reverse();
      },
    }),
    updateRetrospective: builder.mutation<IRetrospective, IUpdateRetrospective>(
      {
        invalidatesTags: (_, __, { _id }) => [
          { type: 'EDIT', id: _id },
          'EDIT',
        ],
        query: ({ _id, ...body }) => ({
          url: `/retrospectives/${_id}`,
          body,
          method: 'PATCH',
        }),
      }
    ),
    getSupervisedRetrospectives: builder.query<
      Array<IRetrospective>,
      { dashboard?: boolean }
    >({
      providesTags: ['CREATION', 'DELETION', 'EDIT'],
      query: () => ({
        url: '/supervisors/retrospectives',
      }),
      transformResponse: (retrospectives: Array<IRetrospective>, _, arg) => {
        if (arg.dashboard) {
          return retrospectives
            .slice()
            .sort(
              (a, b) =>
                new Date(b.creationDate).getTime() -
                new Date(a.creationDate).getTime()
            )
            .slice(0, 3);
        }

        return retrospectives;
      },
    }),
    getSuperviseDetails: builder.query<IRetrospective, string>({
      providesTags: (_, __, id) => [{ type: 'EDIT', id }],
      query: (id) => ({
        url: `/supervisors/retrospectives/${id}`,
      }),
    }),
  }),
  overrideExisting: 'throw',
});

export const {
  useCreateRetrospectiveMutation,
  useGetRetrospectiveDetailsQuery,
  useGetRetrospectivesQuery,
  useDeleteRetrospectiveMutation,
  useUpdateRetrospectiveMutation,
  useGetSupervisedRetrospectivesQuery,
  useGetSuperviseDetailsQuery,
} = retrospectivesApi;
