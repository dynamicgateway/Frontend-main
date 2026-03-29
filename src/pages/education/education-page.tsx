import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@mui/material';
import { CustomTypography } from '@/components/custom-typography';
import GenericBox from '@/components/generic-box';
import { colors } from '@/theme/colors';
import { useThemeDirection } from '@/theme/use-theme-direction';
import { ICONS_TABLE_KEYS } from '@/constants/icons-constants';
import EducationPageImage from '@/assets/images/education-page.png';
import { twJoin } from 'tailwind-merge';

const EducationPage: React.FC = () => {
  const { t } = useTranslation();
  const { direction } = useThemeDirection();
  const [activeBox, setActiveBox] = useState<string | null>(null);

  const boxesData = [
    {
      key: ICONS_TABLE_KEYS.kindergartenSignup,
      text: t('education.kindergartenRegistration'),

      onPress: () => {
        console.log('Kindergarten Registration clicked');
        setActiveBox(ICONS_TABLE_KEYS.kindergartenSignup);
      },
    },
    {
      key: ICONS_TABLE_KEYS.campSignup,
      text: t('education.campRegistration'),

      onPress: () => {
        console.log('Camp Registration clicked');
        setActiveBox(ICONS_TABLE_KEYS.campSignup);
      },
    },
    {
      key: ICONS_TABLE_KEYS.showPlacement,
      text: t('education.showPlacement'),

      onPress: () => {
        console.log('Show Placement clicked');
        setActiveBox(ICONS_TABLE_KEYS.showPlacement);
      },
    },
    {
      key: ICONS_TABLE_KEYS.classesSignup,
      text: t('education.classesRegistration'),

      onPress: () => {
        console.log('Classes Registration clicked');
        setActiveBox(ICONS_TABLE_KEYS.classesSignup);
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
              <img src={EducationPageImage} alt="education" />
            </div>

            <div className="max-w-2xl">
              <div className="mt-6 mb-9">
                <CustomTypography type="hOne" style={{ color: colors.primaryBlue }}>
                  {t('education.title')}
                </CustomTypography>
              </div>
              <div className="">
                <CustomTypography type="textThirdThin" style={{ letterSpacing: '1px', color: colors.darkGrey }}>
                  {t('education.description')}
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
          <div className="w-1/2 min-w-[350px] text-start">
            <CustomTypography type="textFour" style={{ color: 'white' }}>
              {t('education.scheduleAppointmentText')}
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
                {t('education.scheduleAppointmentButton')}
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

export { EducationPage };
