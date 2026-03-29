import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export const SNACKBAR_NOTIFICATION_SLICE = 'snackbar_notification_slice';

export interface SnackbarMessage {
  message: string | null;
  variant?: 'success' | 'error' | 'warning' | 'info';
  isPersistent?: boolean;
}

interface SnackbarNotificationSlice {
  enqueuedMessages: Array<SnackbarMessage>;
}

const initialState: SnackbarNotificationSlice = {
  enqueuedMessages: [],
};

/*-----SLICES-----*/
const snackbarNotificationSlice = createSlice({
  name: SNACKBAR_NOTIFICATION_SLICE,
  initialState,
  reducers: {
    enqueueSnackbarMessage: (state, { payload }: PayloadAction<SnackbarMessage>) => ({
      ...state,
      enqueuedMessages: payload ? [...state.enqueuedMessages, payload] : state.enqueuedMessages,
    }),
    dequeueSnackbarMessage: (state) => ({
      ...state,
      enqueuedMessages: state.enqueuedMessages.slice(1),
    }),
    resetSnackbarNotifications: () => initialState,
  },
  selectors: {
    selectSnackbarNotifications: (state) => state.enqueuedMessages,
  },
});

export default snackbarNotificationSlice;

export const { enqueueSnackbarMessage, dequeueSnackbarMessage, resetSnackbarNotifications } =
  snackbarNotificationSlice.actions;
export const { selectSnackbarNotifications } = snackbarNotificationSlice.selectors;
