import type { FC } from 'react';
import { useSelector } from 'react-redux';
import { ZIndexLevelsEnum } from '@/constants/ui-constants';
import { selectBusyIndicator } from '@/store/slices/busy-indicator';
import Lottie from 'lottie-react';
import loadingAnimation from '@/assets/animations/Loading.json';

export const BusyIndicator: FC = () => {
  const isEnabled = useSelector(selectBusyIndicator);

  // Loading component
  const LoadingComponent = () => (
    <div
      className={`flex min-h-full w-full items-center justify-center`}
      style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
    >
      <div className="flex flex-col items-center">
        <Lottie animationData={loadingAnimation} loop={true} style={{ width: 200, height: 200 }} />
      </div>
    </div>
  );

  return isEnabled ? (
    <div className={`fixed inset-0 bg-transparent z-[${ZIndexLevelsEnum.BUSY_INDICATOR_ROOT}]`}>
      <div
        className={`top-1/2 left-1/2 h-16 w-16 z-[${ZIndexLevelsEnum.BUSY_INDICATOR_CONTAINER}] absolute flex items-center justify-center`}
      >
        <LoadingComponent />
      </div>
    </div>
  ) : null;
};
