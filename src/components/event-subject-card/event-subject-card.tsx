import React from 'react';
import { CustomTypography } from '@/components/custom-typography';
import { colors } from '@/theme/colors';
import { twMerge } from 'tailwind-merge';

interface EventSubjectCardProps {
  title: string;
  subtitle: string;
  buttonText: string;
  imageUrl?: string;
  onButtonClick: () => void;
}

export const EventSubjectCard: React.FC<EventSubjectCardProps> = ({
  title,
  subtitle,
  buttonText,
  imageUrl,
  onButtonClick,
}) => {
  return (
    <div
      className={twMerge(
        'flex flex-col',
        'h-[474px] w-[520px] p-4',
        'rounded-[20px] bg-white shadow-lg',
        'transition-all duration-200 ease-in-out hover:shadow-xl',
        'hover:shadow-xl'
      )}
    >
      {/* Image Placeholder/Image */}
      <div
        className="flex h-[240px] w-full items-center justify-center rounded-[16px] bg-gray-300"
        style={{
          backgroundImage: imageUrl ? `url(${imageUrl})` : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundColor: imageUrl ? 'transparent' : '#D9D9D9',
        }}
      >
        {!imageUrl && <div className="text-sm text-gray-500">Image Placeholder</div>}
      </div>
      {/* Content Section */}
      <div className="flex flex-1 flex-col justify-between px-6 pt-8">
        {/* Title and Subtitle */}
        <div className="mb-8 text-center">
          <div className="mb-2">
            <CustomTypography type="hThree" style={{ color: colors.primaryBlue }} className="mb-3">
              {title}
            </CustomTypography>
          </div>

          <div className="">
            <CustomTypography type="textThirdThin" style={{ color: colors.darkGrey }} className="leading-relaxed">
              {subtitle}
            </CustomTypography>
          </div>
        </div>

        {/* Button */}
        <button
          onClick={onButtonClick}
          className={twMerge(
            'w-full rounded-[20px]',
            'h-[42px]',
            'font-medium text-white',
            'transition-all duration-200 ease-in-out hover:opacity-90'
          )}
          style={{
            backgroundColor: colors.secondaryBlue,
          }}
        >
          <div className="flex items-center justify-center gap-2">
            <div className="">
              <CustomTypography type="textThird" style={{ color: colors.white }}>
                {buttonText}
              </CustomTypography>
            </div>
            <span className="text-white">›</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default EventSubjectCard;
