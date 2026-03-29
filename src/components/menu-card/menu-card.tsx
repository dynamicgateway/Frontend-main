import React from 'react';
import { CustomTypography } from '@/components/custom-typography';
import { colors } from '@/theme/colors';

export interface MenuItem {
  text: string;
  value: string;
}

export interface MenuCardProps {
  icon: React.ReactNode;
  title: string;
  items: Array<MenuItem>;
  onItemClick?: (value: string) => void;
}

const MenuCard: React.FC<MenuCardProps> = ({ icon, title, items, onItemClick }) => {
  const handleItemClick = (value: string) => {
    if (onItemClick) {
      onItemClick(value);
    }
  };

  return (
    <div className="w-[300px] rounded-[36px] bg-white p-6 pt-0 shadow-lg sm:w-[500px]">
      {/* Header Section */}
      <div className="align-center flex h-[100px] items-center gap-4">
        <div className="flex-1 items-center justify-center">
          <div>
            <CustomTypography type="textTertiary" style={{ color: colors.primaryBlue }}>
              {title}
            </CustomTypography>
          </div>
        </div>
        <div className="flex-shrink-0">{icon}</div>
      </div>

      {/* Menu Items */}
      <div className="">
        {items.map((item, index) => (
          <div
            key={index}
            className="cursor-pointer rounded-lg transition-colors hover:bg-gray-50"
            onClick={() => handleItemClick(item.value)}
          >
            <CustomTypography
              type="textThirdThin"
              style={{ color: '#625F68', lineHeight: '36px' }}
              className="text-right"
            >
              {item.text}
            </CustomTypography>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuCard;
