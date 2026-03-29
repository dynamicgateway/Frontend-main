import { IslandFlagIcon, CalendarIcon } from '@/assets';
import * as PATHS from '@/constants/router-paths-constants';

export const notificationKeys = ['liveTracking', 'dashboard', 'events'] as const;

export type NotificationKey = (typeof notificationKeys)[number];

interface NavItem {
  icon: any;
  label: string;
  path: string;
  notificationKey: NotificationKey;
  subItems?: Array<{ label: string; path: string }>;
}

export const navItems: Array<NavItem> = [
  {
    icon: IslandFlagIcon,
    label: 'navBar.liveTracking',
    path: PATHS.LIVE_TRACKING,
    notificationKey: 'liveTracking',
  },
  {
    icon: IslandFlagIcon,
    label: 'navBar.dashboard',
    path: PATHS.DASHBOARD,
    notificationKey: 'dashboard',
  },

  {
    icon: CalendarIcon,
    label: 'navBar.events',
    path: PATHS.EVENTS,
    notificationKey: 'events',
  },
];
