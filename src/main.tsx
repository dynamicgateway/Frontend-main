import { useEffect, useState, type FC } from 'react';

import { Outlet } from 'react-router';
import { BusyIndicator } from '@/components/busy-indicator';
import { SnackbarNotification } from '@/components/snackbar-notification';
import Toast from '@/components/toast';
import BackgroundImage from '@/components/background-image';
import { useDispatch, useSelector } from 'react-redux';
import { selectToast } from '@/store/slices/toast';
import { getCurrentUser } from 'aws-amplify/auth';
import { selectUserData, setUserData, clearUserData } from './store/slices/user-data';
import { UserDataRole } from './types/user-data';
import BackgroundImage1 from '@/assets/images/background.png';

export const Main: FC = () => {
  const toast = useSelector(selectToast);
  const dispatch = useDispatch();
  const user = useSelector(selectUserData);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        if (!user.userId) {
          // const currentUser = await getCurrentUser();
          // if (currentUser.userId) {
          //   const userRole = localStorage.getItem('userRole');
          //   dispatch(
          //     setUserData({
          //       userId: currentUser.userId,
          //       role: userRole as UserDataRole,
          //       userOnBoardingStatus: null,
          //       userOnBoardingType: null,
          //     })
          //   );
          // } else {
          //   // Clear any stale data if user is not authenticated
          //   dispatch(clearUserData());
          // }
        }
      } catch (error: unknown) {
        console.error('Main useEffect error', error);
        // Clear user data on authentication error
        dispatch(clearUserData());
      } finally {
        setIsLoading(false);
      }
    })();
  }, [user.userId, dispatch]);

  // Show loading indicator while checking authentication
  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <>
      {/* Background Image - you can change the imageSrc prop to your desired image */}
      <BackgroundImage imageSrc={BackgroundImage1} />

      <div className="flex h-full w-full flex-row">
        <div className="relative flex-1 flex-col overflow-y-auto pb-16">
          <div className="h-auto h-full">
            <Toast type={toast.type} message={toast.message} isOpen={toast.isOpen ?? false} />

            <Outlet />
          </div>
        </div>

        <BusyIndicator />
        <SnackbarNotification />
      </div>
    </>
  );
};
