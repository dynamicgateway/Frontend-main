import { notificationKeys, type NotificationKey } from '@/constants/nav-bar';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export const NAV_BAR_NOTIFICATION_SLICE = 'nav_bar_notification_slice';

export interface NavBarMessage {
  message: string | null;
  variant: 'success' | 'error' | 'warning' | 'info';
  category: string;
}

type NavBarNotificationSlice = Record<NotificationKey, NavBarMessage | null>;

const initialState: NavBarNotificationSlice = Object.fromEntries(
  notificationKeys.map((key) =>
    key === 'events' ? [key, { message: '+23', variant: 'error', category: 'events' }] : [key, null]
  )
) as NavBarNotificationSlice;

/*-----SLICES-----*/
const navBarNotificationSlice = createSlice({
  name: NAV_BAR_NOTIFICATION_SLICE,
  initialState,
  reducers: {
    enqueueNavBarMessage: (state, { payload }: PayloadAction<NavBarMessage>) => ({
      ...state,
      [payload.category]: payload,
    }),
    dequeueNavBarMessage: (state, { payload }: PayloadAction<NavBarMessage['category']>) => ({
      ...state,
      [payload]: null,
    }),
    resetNavBarNotifications: () => initialState,
  },
  selectors: {
    selectNavBarNotifications: (state) => state,
  },
});

export default navBarNotificationSlice;

export const { enqueueNavBarMessage, dequeueNavBarMessage, resetNavBarNotifications } = navBarNotificationSlice.actions;
export const { selectNavBarNotifications } = navBarNotificationSlice.selectors;

export type { NavBarNotificationSlice };
