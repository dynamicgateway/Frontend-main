import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CustomTypography } from '@/components/custom-typography';
import GenericBox from '@/components/generic-box';
import { colors } from '@/theme/colors';
import { ICONS_TABLE_KEYS } from '@/constants/icons-constants';
import changePayers from '@/assets/images/change-payers.png';
const OpenRequestChangePayersPage: React.FC = () => {
  const { t } = useTranslation();
  const [activeBox, setActiveBox] = useState<string | null>(null);

  const boxesData = [
    {
      key: ICONS_TABLE_KEYS.startEndLease,
      text: t('openRequestChangePayersPage.options.rentalContract'),

      onPress: () => {
        console.log('Start/End of rental contract clicked');
        setActiveBox(ICONS_TABLE_KEYS.startEndLease);
      },
    },
    {
      key: ICONS_TABLE_KEYS.buySellAsset,
      text: t('openRequestChangePayersPage.options.purchaseSale'),

      onPress: () => {
        console.log('Purchase/Sale of property clicked');
        setActiveBox(ICONS_TABLE_KEYS.buySellAsset);
      },
    },
  ];

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-4xl px-8 py-16">
        {/* Header Section */}
        <div className="mb-16 text-center">
          <div className="mb-21 flex items-center justify-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center">
              <img src={changePayers} alt="changePayers" />
            </div>
            <div>
              <CustomTypography type="hThree" style={{ color: colors.primaryBlue }}>
                {t('openRequestChangePayersPage.title')}
              </CustomTypography>
            </div>
            {/* Icon representing exchange between people */}
          </div>

          <CustomTypography type="textFourThin" style={{ color: colors.darkGrey, letterSpacing: '0.5px' }}>
            {t('openRequestChangePayersPage.instruction')}
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
      </div>
    </div>
  );
};

export default OpenRequestChangePayersPage;
