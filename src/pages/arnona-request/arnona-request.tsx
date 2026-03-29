import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@mui/material';
import { CustomTypography } from '@/components/custom-typography';
import GenericBox from '@/components/generic-box';
import { colors } from '@/theme/colors';
import { useThemeDirection } from '@/theme/use-theme-direction';
import { ICONS_TABLE, ICONS_TABLE_KEYS } from '@/constants/icons-constants';
import arnonaRequet from '@/assets/images/arnona-request.png';
import { twJoin } from 'tailwind-merge';
export const ArnonaRequestPage: React.FC = () => {
  const { t } = useTranslation();
  const { direction } = useThemeDirection();
  const [activeBox, setActiveBox] = useState<string | null>(null);

  const boxesData = [
    {
      key: ICONS_TABLE_KEYS.newRequest,
      text: t('arnonaRequest.newRequest'),

      onPress: () => {
        console.log('New Request clicked');
        setActiveBox(ICONS_TABLE_KEYS.newRequest);
      },
    },
    {
      key: ICONS_TABLE_KEYS.existingRequest,
      text: t('arnonaRequest.existingRequest'),

      onPress: () => {
        console.log('Existing Request clicked');
        setActiveBox(ICONS_TABLE_KEYS.existingRequest);
      },
    },

    {
      key: ICONS_TABLE_KEYS.discountCalculator,
      text: t('arnonaRequest.discountCalculator'),

      onPress: () => {
        console.log('Discount Calculator clicked');
        setActiveBox(ICONS_TABLE_KEYS.discountCalculator);
      },
    },
  ];

  const handleScheduleAppointment = () => {
    console.log('Schedule Appointment clicked');
    // Add your logic here
  };

  return (
    <div className="min-h-full py-12" dir={direction}>
      <div className="mx-auto max-w-6xl">
        {/* Header Section */}
        <div className="flex flex-col">
          <div className="mb-12 flex gap-15">
            <div className="flex h-[200px] w-[200px] items-center justify-center rounded-2xl">
              <img src={arnonaRequet} alt="arnonaRequest" />
            </div>

            <div className="max-w-2xl">
              <div className="mt-6 mb-9">
                <CustomTypography type="hOne" style={{ color: colors.primaryBlue }}>
                  {t('arnonaRequest.title')}
                </CustomTypography>
              </div>
              <div className="">
                <CustomTypography type="textThirdThin" style={{ letterSpacing: '1px', color: colors.darkGrey }}>
                  {t('arnonaRequest.description')}
                </CustomTypography>
              </div>
            </div>

            {/* Illustrative Graphic */}
          </div>

          {/* Central Generic Boxes */}
          <div className="mb-20 flex flex-wrap justify-center gap-8">
            {boxesData.map((box) => (
              <GenericBox
                key={box.key}
                text={box.text}
                iconWidth={75}
                iconHeight={75}
                name={box.key}
                onPress={box.onPress}
                isBoxActive={activeBox === box.key}
              />
            ))}
          </div>
        </div>

        {/* Bottom Call to Action Banner */}
        <div
          className={twJoin(
            'mb-40 flex min-h-[122px]',
            'justify-center, flex-col items-center',
            'gap-25 rounded-[36px] p-9 text-center',
            'sm:mb-0 sm:flex-row sm:items-center sm:justify-between sm:gap-0 sm:text-left',
            'xs:mb-40'
          )}
          style={{
            backgroundColor: colors.secondaryBlue,
            boxShadow: '0px 16px 32px 0px ' + colors.secondaryMediumBlue,
          }}
        >
          <div className="w-1/2 min-w-[350px]">
            <CustomTypography type="textFour" style={{ color: 'white' }}>
              {t('arnonaRequest.scheduleAppointmentText')}
            </CustomTypography>
          </div>

          <Button
            variant="outlined"
            onClick={handleScheduleAppointment}
            className="px-6 py-3 hover:bg-white"
            style={{ borderColor: 'white', borderRadius: '36px', width: '272px', height: '50px' }}
          >
            <div className="flex items-center gap-2">
              <CustomTypography type="textThird" style={{ color: 'white' }}>
                {t('arnonaRequest.scheduleAppointmentButton')}
              </CustomTypography>
              <div style={{ color: colors.white, fontSize: '24px', fontWeight: '600' }}>
                {direction === 'rtl' ? '›' : '‹'}
              </div>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};
