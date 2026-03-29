import type { FC } from 'react';
import { colors } from '@/theme/colors';
import { twJoin } from 'tailwind-merge';
import BottomNavImg from '@/assets/images/bottom-nav.png';
export const BottomNav: FC = () => {
  return (
    <div
      className={twJoin('fixed right-0 bottom-0 left-0 z-[9999]', 'flex items-center', 'w-full px-30', 'shadow-lg')}
      style={{ backgroundColor: colors.bottomNavBg, height: '120px' }}
    >
      <div className="a mb-2 flex w-full justify-between">
        <img src={BottomNavImg} alt="Bottom Nav" />
        <img src={BottomNavImg} alt="Bottom Nav" />
      </div>
    </div>
  );
};
