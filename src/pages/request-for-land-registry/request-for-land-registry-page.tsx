import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@mui/material';
import { CustomTypography } from '@/components/custom-typography';
import GenericBox from '@/components/generic-box';
import { colors } from '@/theme/colors';
import { useThemeDirection } from '@/theme/use-theme-direction';
import { ICONS_TABLE_KEYS } from '@/constants/icons-constants';
import LandRegistryPageImage from '@/assets/images/land-registry.png';

const RequestForLandRegistryPage: React.FC = () => {
  const { t } = useTranslation();
  const { direction } = useThemeDirection();
  const [activeBox, setActiveBox] = useState<string | null>(null);

  const boxesData = [
    {
      key: ICONS_TABLE_KEYS.buySellAsset,
      text: t('requestForLandRegistryPage.options.salesTransaction'),

      onPress: () => {
        console.log('Sales transaction clicked');
        setActiveBox(ICONS_TABLE_KEYS.buySellAsset);
      },
    },
    {
      key: ICONS_TABLE_KEYS.communalHome,
      text: t('requestForLandRegistryPage.options.sharedBuildingRegistration'),

      onPress: () => {
        console.log('Shared building registration clicked');
        setActiveBox(ICONS_TABLE_KEYS.communalHome);
      },
    },
    {
      key: ICONS_TABLE_KEYS.fitnessFacilities,
      text: t('requestForLandRegistryPage.options.inheritanceWill'),

      onPress: () => {
        console.log('Inheritance/Will clicked');
        setActiveBox(ICONS_TABLE_KEYS.fitnessFacilities);
      },
    },
    {
      key: ICONS_TABLE_KEYS.seniorCitizensHome,
      text: t('requestForLandRegistryPage.options.transferWithoutConsideration'),

      onPress: () => {
        console.log('Transfer without consideration clicked');
        setActiveBox(ICONS_TABLE_KEYS.seniorCitizensHome);
      },
    },
    {
      key: ICONS_TABLE_KEYS.newRequest,
      text: t('requestForLandRegistryPage.options.other'),

      onPress: () => {
        console.log('Other clicked');
        setActiveBox(ICONS_TABLE_KEYS.newRequest);
      },
    },
  ];

  const handleIssueApproval = () => {
    console.log('Issue approval clicked');
    // Add your logic here
  };

  return (
    <div className="min-h-full py-12" dir={direction}>
      <div className="mx-auto max-w-6xl">
        {/* Header Section */}
        <div className="flex flex-col">
          <div className="mb-12 flex gap-15">
            <div className="flex h-[200px] w-[200px] items-center justify-center rounded-2xl">
              <img src={LandRegistryPageImage} alt="land registry" />
            </div>

            <div className="max-w-[800px]">
              <div className="mt-6 mb-9">
                <CustomTypography type="hOne" style={{ color: colors.primaryBlue }}>
                  {t('requestForLandRegistryPage.title')}
                </CustomTypography>
              </div>
              <div className="">
                <CustomTypography type="textThirdThin" style={{ letterSpacing: '1px', color: colors.darkGrey }}>
                  {t('requestForLandRegistryPage.description')}
                </CustomTypography>
              </div>
            </div>

            {/* Illustrative Graphic */}
          </div>

          {/* Central Generic Boxes */}
          <div className="mb-20 flex max-w-[890px] flex-wrap justify-center gap-8">
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

        <div className="flex justify-center">
          <Button
            disabled={activeBox === null}
            variant="contained"
            onClick={handleIssueApproval}
            className="px-6 py-3 hover:bg-white"
            style={{
              borderRadius: '36px',
              width: '272px',
              height: '50px',
              backgroundColor: activeBox ? colors.primaryBlue : colors.darkGrey,
            }}
          >
            <div className="flex items-center gap-2">
              <CustomTypography type="textThird" style={{ color: colors.white }}>
                {t('requestForLandRegistryPage.issueApprovalButton')}
              </CustomTypography>
              <div style={{ color: colors.white, fontSize: '24px', fontWeight: '600' }}>›</div>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RequestForLandRegistryPage;
