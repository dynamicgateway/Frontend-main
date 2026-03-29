import React from 'react';
import { CustomTypography } from '@/components/custom-typography';
import { colors } from '@/theme/colors';
import { useTranslation } from 'react-i18next';

export const CompanyInfo: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      {/* Main Content Box */}
      <div
        className="rounded-lg px-45 py-20 shadow-lg"
        style={{
          backgroundColor: '#F5FAFC',
        }}
      >
        {/* Title */}
        <div className="mb-15 text-center">
          <CustomTypography type="hThree" style={{ color: colors.primaryBlue }}>
            {t('companyInfo.title')}
          </CustomTypography>
        </div>

        {/* Main Content */}
        <div className="mb-8 space-y-4 text-center">
          {/* Paragraph 1 */}
          <div>
            <CustomTypography
              type="textFifth"
              style={{ color: colors.darkGrey, lineHeight: '32px', letterSpacing: '1.5px' }}
            >
              {t('companyInfo.paragraph1.part')}
            </CustomTypography>
          </div>

          {/* Paragraph 2 */}
          <div>
            <CustomTypography
              type="textFifth"
              style={{ color: colors.darkGrey, lineHeight: '32px', letterSpacing: '1.5px' }}
            >
              {t('companyInfo.paragraph2.part1')}
            </CustomTypography>
          </div>

          {/* Paragraph 3 */}
          <div>
            <CustomTypography
              type="textFifthBold"
              style={{ color: colors.darkGrey, lineHeight: '32px', letterSpacing: '1.5px' }}
            >
              {t('companyInfo.paragraph3')}
            </CustomTypography>
          </div>
        </div>

        {/* Call to Action Button */}
        <div className="flex justify-center">
          <button
            className="flex items-center gap-2 rounded-full px-6 py-3 text-white transition-colors"
            style={{
              backgroundColor: colors.secondaryBlue,
            }}
            onClick={() => {
              // Add your click handler here
              console.log('Company info button clicked');
            }}
          >
            <CustomTypography type="textThird" style={{ color: 'white' }}>
              {t('companyInfo.buttonText')}
            </CustomTypography>
            <span className="text-bold text-lg text-white">›</span>
          </button>
        </div>
      </div>
    </>
  );
};
