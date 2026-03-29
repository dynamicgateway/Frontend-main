import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';

import { api } from '@/apis/core/api';
import busyIndicatorSlice from '@/store/slices/busy-indicator';
import snackbarNotificationSlice from '@/store/slices/snackbar-notification';
import systemSlice from '@/store/slices/system';
import navBarNotificationSlice from '@/store/slices/nav-bar-notification';
import userDataSlice from '@/store/slices/user-data';
import toastSlice from '@/store/slices/toast';

export const store = configureStore({
  reducer: combineReducers({
    [api.reducerPath]: api.reducer,
    [busyIndicatorSlice.name]: busyIndicatorSlice.reducer,
    [snackbarNotificationSlice.name]: snackbarNotificationSlice.reducer,
    [systemSlice.name]: systemSlice.reducer,
    [navBarNotificationSlice.name]: navBarNotificationSlice.reducer,
    [userDataSlice.name]: userDataSlice.reducer,
    [toastSlice.name]: toastSlice.reducer,
  }),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
  devTools: process.env.NODE_ENV !== 'production',
});

export type Store = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
