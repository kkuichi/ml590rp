import { ICredentials } from '@/types/types';
import { rootApi } from '../rootApi';

export const userEndpoints = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    // TODO REPLACE WITH SERVER ACTION
    registration: builder.mutation<void, ICredentials>({
      query: (args) => ({
        url: '/auth/registration',
        body: args,
        method: 'POST',
      }),
    }),
  }),
});

export const { useRegistrationMutation } = userEndpoints;
