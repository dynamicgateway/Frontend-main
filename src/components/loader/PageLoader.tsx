import React from 'react';
import Player from 'lottie-react';
import loading from '@/assets/animations/Loading.json';
import { CustomTypography } from '../custom-typography';
import { t } from 'i18next';

interface PageLoaderProps {
  children?: React.ReactNode;
  isLoading?: boolean;
  loadingText?: string;
}

const PageLoader: React.FC<PageLoaderProps> = ({
  children,
  isLoading = true,
  loadingText = t('loader.generatingResume'),
}) => {
  if (!isLoading) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(255,255,255,0.9)]">
      <div className="flex flex-col items-center justify-center space-y-4">
        <Player autoplay loop animationData={loading} style={{ width: 120, height: 120 }} />
        <CustomTypography type="hFour" className="text-center">
          {children || loadingText}
        </CustomTypography>
      </div>
    </div>
  );
};

export default PageLoader;
