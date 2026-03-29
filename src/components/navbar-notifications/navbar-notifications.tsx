import type { FC } from 'react';
import type { NavBarMessage } from '@/store/slices/nav-bar-notification';
import { twJoin } from 'tailwind-merge';

const NavbarNotifications: FC<NavBarMessage> = ({ message, variant }) => {
  const notificationVariant = {
    success: {
      backgroundColor: '#008000',
      textColor: '#FFFFFF',
    },
    error: {
      backgroundColor: '#FBEAD7',
      textColor: '#A82E24',
    },
    warning: {
      backgroundColor: '#FFFF00',
      textColor: '#000000',
    },
    info: {
      backgroundColor: '#000000',
      textColor: '#FFFFFF',
    },
  };

  return (
    <div
      className={twJoin('rounded-md p-2', 'text-sm')}
      style={{
        backgroundColor: notificationVariant[variant].backgroundColor,
        color: notificationVariant[variant].textColor,
      }}
    >
      {message}
    </div>
  );
};

export default NavbarNotifications;
