import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const rootApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: `${
      process.env.NODE_ENV === 'production'
        ? process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
        : 'http://localhost:3000'
    }/api`,
  }),
  endpoints: () => ({}),
  tagTypes: ['CREATION', 'DELETION', 'EDIT','COMMENT_CREATION'],
});
