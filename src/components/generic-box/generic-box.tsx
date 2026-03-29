import React, { useState } from 'react';
import { CustomTypography } from '@/components/custom-typography';
import { colors } from '@/theme/colors';
import { ICONS_TABLE } from '@/constants/icons-constants';
import { twJoin } from 'tailwind-merge';
import Check from '@/assets/images/Check.png';
interface GenericBoxProps {
  text: string;
  name: string;
  onPress: () => void;
  iconWidth?: number;
  iconHeight?: number;
  isBoxActive?: boolean;
}

export const GenericBox: React.FC<GenericBoxProps> = ({
  text,
  name,
  onPress,
  iconWidth = 48,
  iconHeight = 48,
  isBoxActive = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const defaultIcon = ICONS_TABLE.default[name as keyof typeof ICONS_TABLE.default];
  const hoverIcon = ICONS_TABLE.hover[name as keyof typeof ICONS_TABLE.hover];
  const activeIcon = ICONS_TABLE.active[name as keyof typeof ICONS_TABLE.active];

  const getCurrentIcon = () => {
    const iconStyle = { width: iconWidth, height: iconHeight };

    if (isBoxActive) return React.createElement(activeIcon, { style: iconStyle });
    if (isHovered) return React.createElement(hoverIcon, { style: iconStyle });
    return React.createElement(defaultIcon, { style: iconStyle });
  };

  return (
    <div
      onClick={onPress}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={twJoin(
        'relative flex flex-col items-center justify-center',
        'h-[187px] w-[200px]',
        'cursor-pointer rounded-[36px] bg-white p-4',
        'shadow-lg transition-all duration-200 ease-in-out hover:shadow-xl'
      )}
      style={{
        border: isBoxActive ? `2px solid ${colors.secondaryBlue}` : '2px solid transparent',
      }}
    >
      {isBoxActive && (
        <div className="absolute top-[-10px] right-[-10px]">
          <img src={Check} alt="checkmark" />
        </div>
      )}
      <div className="mb-4">{getCurrentIcon()}</div>
      <div className="text-center">
        <CustomTypography type="textSecondaryOneBold" style={{ color: colors.primaryBlue }}>
          {text}
        </CustomTypography>
      </div>
    </div>
  );
};
