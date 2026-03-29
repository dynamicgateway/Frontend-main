import { Main } from '@/main';
import { ROUTES, type RouteItem } from '@/routes/routes';
import useAppInitialize from '@/use-app-initialize';
import { useEffect, useMemo, type FC } from 'react';
import { Navigate, createBrowserRouter, RouterProvider } from 'react-router';
import { useSelector } from 'react-redux';
import ProtectedLayout from './layouts/protected-layout';
import { AppHeader } from './components/app-header';
import { BottomNav } from './components/bottom-nav';
import {
  selectIsMobile,
  selectDirection,
  selectLanguage,
  setDirection,
  setLanguage,
  PageDirection,
  AppLanguage,
} from '@/store/slices/system';
import { selectUserRole } from '@/store/slices/user-data';
import i18n from '@/system/i18n';
import { useAppDispatch } from '@/store/store';
import { UserDataRole } from '@/types/user-data';
import * as PATHS from '@/constants/router-paths-constants';

export const App: FC = () => {
  useAppInitialize();
  const dispatch = useAppDispatch();
  const isMobile = useSelector(selectIsMobile);
  const userRole = useSelector(selectUserRole);
  const direction = useSelector(selectDirection);
  
  // Load Dynamic Gateway Integration SDK v2
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'http://localhost:5173/integration-sdk-v2.js' // Updated to v2
    script.async = true
    script.onload = () => {
      console.log('[MUNI] ✓ Dynamic Gateway Integration SDK v2 loaded')
    }
    script.onerror = () => {
      console.error('[MUNI] ✗ Failed to load Integration SDK')
    }
    document.head.appendChild(script)
    
    return () => {
      document.head.removeChild(script)
    }
  }, [])
  const language = useSelector(selectLanguage);

  // Initialize from localStorage on first mount
  useEffect(() => {
    const rawDir = localStorage.getItem('app.direction');
    const rawLang = localStorage.getItem('app.language');
    const storedDirection = rawDir === PageDirection.LTR || rawDir === PageDirection.RTL ? rawDir : PageDirection.RTL;
    const storedLanguage = rawLang === AppLanguage.EN || rawLang === AppLanguage.HE ? rawLang : AppLanguage.HE;
    dispatch(setDirection(storedDirection));
    dispatch(setLanguage(storedLanguage));
  }, [dispatch]);

  // Apply dir and i18n language whenever they change
  useEffect(() => {
    if (document?.documentElement) {
      document.documentElement.setAttribute('dir', direction);
    }
    i18n.changeLanguage(language);
    localStorage.setItem('app.direction', direction);
    localStorage.setItem('app.language', language);
  }, [direction, language]);

  // Prepare routes once per render, wrapping protected ones and redirecting logged-in users from public routes
  const preparedRoutes: Array<RouteItem> = useMemo(() => {
    return ROUTES.map((route) => {
      const allowedRoles = 'role' in route ? ((route as any).role as Array<UserDataRole> | undefined) : undefined;

      return {
        ...route,
        element: (
          <>
            <div className="">
              {isMobile ? null : <AppHeader />}
              <div className="pb-[120px]">{route.element}</div>
              <BottomNav />
            </div>
          </>
        ),
      } as RouteItem;

      // if (allowedRoles?.length) {
      //   // Protected route - requires authentication
      //   if (!userRole) {
      //     return { ...route, element: <Navigate to={PATHS.BASE_PATH} replace /> } as RouteItem;
      //   }
      //   if (!allowedRoles.includes(userRole)) {
      //     return { ...route, element: <Navigate to={PATHS.HOME} replace /> } as RouteItem;
      //   }
      //   return {
      //     ...route,
      //     element: (
      //       <ProtectedLayout>
      //         {route.element}
      //         <BottomNav />
      //       </ProtectedLayout>
      //     ),
      //   } as RouteItem;
      // }
      // else {
      //   // Public route - redirect logged-in users to their dashboard
      //   if (
      //     userRole &&
      //     !location.pathname.includes(PATHS.JOB_SEEKERS) &&
      //     !location.pathname.includes(PATHS.EMPLOYERS)
      //   ) {
      //     const dashboardPath =
      //       userRole === UserDataRole.JOB_SEEKER ? PATHS.JOB_SEEKERS_PROFILE : PATHS.EMPLOYERS_PROFILE;

      //     return {
      //       ...route,
      //       element: <Navigate to={dashboardPath} replace />,
      //     } as RouteItem;
      //   }

      //   // Public route - no user logged in, show normally
      //   return {
      //     ...route,
      //     element: (
      //       <>
      //         <div className="">
      //           {isMobile ? null : <AppHeader />}
      //           <div className="pb-[120px]">{route.element}</div>
      //           <BottomNav />
      //         </div>
      //       </>
      //     ),
      //   } as RouteItem;
      // }
    });
  }, [isMobile, userRole]);
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Main />,
      children: [...preparedRoutes],
    },
  ]);

  return (
    <div className="relative h-full w-full">
      <RouterProvider router={router} />
    </div>
  );
};
