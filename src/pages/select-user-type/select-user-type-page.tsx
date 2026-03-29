import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { CustomTypography } from '@/components/custom-typography';
import GenericBox from '@/components/generic-box';
import { colors } from '@/theme/colors';
import { useThemeDirection } from '@/theme/use-theme-direction';
import { ICONS_TABLE, ICONS_TABLE_KEYS } from '@/constants/icons-constants';
import changePayers from '@/assets/images/change-payers.png';
import { BUY_SELL_ASSET, START_END_LEASE } from '@/constants/routes-query-params-constants';

const SelectUserTypePage: React.FC = () => {
  const { t } = useTranslation();
  const { direction } = useThemeDirection();
  const [activeBox, setActiveBox] = useState<string | null>(null);
  const [searchParams] = useSearchParams();

  const [boxesData, setBoxesData] = useState<any[]>([]);

  // Get the reasonToChange query parameter
  const reasonToChange = searchParams.get('reasonToChange');

  // Log the query parameter for debugging
  console.log('reasonToChange query parameter:', reasonToChange);

  useEffect(() => {
    if (reasonToChange == START_END_LEASE) {
      setBoxesData([
        {
          key: ICONS_TABLE_KEYS.startEndLease,
          text: t('selectUserTypePage.options.incomingTenant'),
          onPress: () => {
            console.log('Incoming tenant clicked');
            setActiveBox(ICONS_TABLE_KEYS.startEndLease);
          },
        },
        {
          key: ICONS_TABLE_KEYS.seniorCitizensHome,
          text: t('selectUserTypePage.options.outgoingTenant'),
          onPress: () => {
            console.log('Outgoing tenant or property owner clicked');
            setActiveBox(ICONS_TABLE_KEYS.seniorCitizensHome);
          },
        },
      ]);
    } else if (reasonToChange == BUY_SELL_ASSET) {
      setBoxesData([
        {
          key: ICONS_TABLE_KEYS.seniorCitizensHome,
          text: t('selectUserTypePage.options.seller'),

          onPress: () => {
            console.log('Outgoing tenant or property owner clicked');
            setActiveBox(ICONS_TABLE_KEYS.seniorCitizensHome);
          },
        },
        {
          key: ICONS_TABLE_KEYS.startEndLease,
          text: t('selectUserTypePage.options.buyer'),

          onPress: () => {
            console.log('Incoming tenant clicked');
            setActiveBox(ICONS_TABLE_KEYS.startEndLease);
          },
        },
      ]);
    }
  }, [reasonToChange]);

  return (
    <div className="h-full">
      <div className="mx-auto max-w-4xl px-8 py-16">
        {/* Header Section */}
        <div className="mb-16 text-center">
          <div className="mb-21 flex items-center justify-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center">
              <img src={changePayers} alt="changePayers" />
            </div>
            <div>
              <CustomTypography type="hThree" style={{ color: colors.primaryBlue }}>
                {t('selectUserTypePage.title')}
              </CustomTypography>
            </div>
            {/* Icon representing exchange between people */}
          </div>

          <CustomTypography type="textFourThin" style={{ color: colors.darkGrey, letterSpacing: '0.5px' }}>
            {t('selectUserTypePage.instruction')}
          </CustomTypography>
        </div>

        {/* Selection Cards */}
        <div className="flex flex-wrap justify-center gap-8">
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

        {/* Back Button */}
        <div className="mt-16 flex justify-center">
          <button
            onClick={() => {
              console.log('Back button clicked');
              // Add navigation logic here
            }}
            className="flex cursor-pointer items-center gap-2 text-blue-600 transition-colors hover:text-blue-800"
          >
            <div style={{ color: colors.primaryBlue, fontSize: '18px', fontWeight: '600' }}>‹</div>

            <div>
              <CustomTypography type="textThird" style={{ color: colors.primaryBlue }}>
                {t('common.back')}
              </CustomTypography>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectUserTypePage;
