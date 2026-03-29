import type { Route } from '@/types/infra';
import { UserDataRole } from '@/types/user-data';

export const filterUnAuthorizedRoutes = (routes: Array<Route>, role: UserDataRole | null) => {
  if (!role) {
    return routes.filter((route) => !route.role);
  } else {
    return routes.filter((route) => !route.role || (Array.isArray(route.role) && route.role.includes(role)));
  }
};

export const getNavItems = (routes: Array<Route>, role: UserDataRole | null) => {
  const filteredRoutes = filterUnAuthorizedRoutes(routes, role);
  return filteredRoutes
    .filter((route) => route.path !== '*' && route.path !== '/')
    .map((route) => {
      return {
        path: route.path,
        label: route.title,
        icon: route.icon,
        notificationKey: route.key,
        displayInNavbar: route.displayInNavbar,
      };
    });
};
