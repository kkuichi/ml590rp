import { configureStore } from '@reduxjs/toolkit';
import { rootApi } from './api/rootApi';
import { systemSlice } from './slices/systemSlice';


export const store = configureStore({
  reducer: {
    [systemSlice.name]: systemSlice.reducer,
    [rootApi.reducerPath]: rootApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([rootApi.middleware]),
});

export type TRootState = ReturnType<typeof store.getState>;
export type TAppDispatch = typeof store.dispatch;