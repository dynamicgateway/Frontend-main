import React from 'react';
import { CustomTypography } from '@/components/custom-typography';
import { colors } from '@/theme/colors';
import { LocationIcon } from '@/assets';
import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useThemeDirection } from '@/theme/use-theme-direction';

export interface ActivityCardProps {
  category: string;
  title: string;
  groupInfo: string;
  schedule: string;
  instructor: string;
  location: string;
  onRegisterClick: () => void;
}

export const ActivityCard: React.FC<ActivityCardProps> = ({
  category,
  title,
  groupInfo,
  schedule,
  instructor,
  location,
  onRegisterClick,
}) => {
  const { t } = useTranslation();
  const { direction } = useThemeDirection();

  return (
    <div className="h-[395px] w-[405px] overflow-hidden rounded-[36px] bg-white p-4 shadow-lg">
      {/* Top Section - Light Blue Background */}
      <div
        className="relative flex h-[150px] w-[378px] flex-col items-center justify-center rounded-[16px] px-6 py-4"
        style={{ backgroundColor: colors.primaryLightBlue }}
      >
        {/* Category Tag - Top Right */}
        <div className="absolute top-6 right-4">
          <div className="rounded-full bg-transparent">
            <CustomTypography
              style={{
                color: colors.primaryBlue,
                border: `2px solid ${colors.primaryBlue}`,
              }}
              type="textThird"
              className="rounded-full bg-transparent px-3 py-1.5"
            >
              {category}
            </CustomTypography>
          </div>
        </div>

        {/* Title - Centered */}
        <div className="absolute inset-0 flex items-center justify-start px-4 text-right">
          <CustomTypography
            style={{
              color: colors.primaryBlue,
            }}
            type="textFour"
            className="text-center leading-tight font-semibold text-blue-700"
          >
            {title}
          </CustomTypography>
        </div>
      </div>

      {/* Bottom Section - White Background */}
      <div className="flex flex-col justify-between pt-4 pl-6">
        <div className="space-y-1">
          {/* Group Info */}
          <div className=" ">
            <CustomTypography style={{ lineHeight: '32px' }} type="textThird" className="text-gray-800">
              {groupInfo}
            </CustomTypography>
          </div>

          {/* Schedule */}
          <div className=" ">
            <CustomTypography style={{ lineHeight: '32px' }} type="textThirdThin" className="text-gray-800">
              {schedule}
            </CustomTypography>
          </div>

          {/* Instructor */}
          <div className=" ">
            <CustomTypography style={{ lineHeight: '32px' }} type="textThirdThin" className="text-gray-800">
              {instructor}
            </CustomTypography>
          </div>

          {/* Location with Icon */}
          <div className="flex items-center gap-2 pt-3 pb-4">
            <LocationIcon />
            <div className="">
              <CustomTypography type="textFifth" className="ml-2 text-gray-800">
                {location}
              </CustomTypography>
            </div>
          </div>
        </div>

        {/* Register Button */}
        <div className="flex w-full justify-center">
          <Button
            variant="contained"
            onClick={() => console.log('register')}
            className="px-6 py-3 hover:bg-white"
            style={{
              borderRadius: '36px',
              width: '100%',
              height: '42px',
              backgroundColor: colors.secondaryBlue,
            }}
          >
            <div className="flex items-center justify-center gap-2">
              <CustomTypography type="textThird" style={{ color: colors.white }}>
                {t('activityCard.register')}
              </CustomTypography>
              <div style={{ color: colors.white, fontSize: '24px', fontWeight: '600' }}>›</div>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};
