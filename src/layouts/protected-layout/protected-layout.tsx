import React from 'react';
import { AppHeader } from '@/components/app-header';
import VerticalNavbar from '@/components/vertical-navbar';
import { useSelector } from 'react-redux';
import { selectIsMobile } from '@/store/slices/system';

const ProtectedLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isMobile = useSelector(selectIsMobile);
  return (
    <div className="protected-layout h-full">
      {isMobile ? <div className="mt-12"></div> : <AppHeader />}
      <div className="flex h-[calc(100vh-64px)]">
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
};

export default ProtectedLayout;
