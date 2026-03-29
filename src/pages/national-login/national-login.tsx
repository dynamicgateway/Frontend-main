import React, { useState } from 'react';
import { Button, Paper } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { CustomTypography } from '@/components/custom-typography';
import { colors } from '@/theme/colors';
import { useThemeDirection } from '@/theme/use-theme-direction';
import { NationalQuickLoginForm } from './national-quick-login-form';
import type { NationalLoginFormData } from './national-login-validation';
import VerificationCode from './verification-code';

export const NationalLoginPage: React.FC = () => {
  const { t } = useTranslation();
  const [showVerification, setShowVerification] = useState(false);

  const { direction } = useThemeDirection();

  const handleQuickLoginSubmit = (data: NationalLoginFormData) => {
    // Handle quick login submission and show verification code
    console.log('National quick login submitted:', data);
    setShowVerification(true);
  };

  const handleVerificationSubmit = (code: string) => {
    // Handle verification code submission
    console.log('National verification code submitted:', code);
  };

  const handleResendCode = () => {
    // Handle resend code
    console.log('National resend code requested');
  };

  return (
    <div className="flex h-full w-full justify-center border bg-transparent p-4" dir={direction}>
      <Paper
        elevation={1}
        className="mx-auto mt-6 h-min w-full max-w-[600px] bg-white shadow-lg"
        sx={{
          borderRadius: '36px',
        }}
      >
        {/* Main Title */}
        {!showVerification && (
          <div className="px-12 pt-15 text-center">
            <div className="mb-11">
              <CustomTypography
                type="hThree"
                style={{
                  color: colors.primaryBlue,
                  marginBottom: '16px',
                  fontWeight: 600,
                }}
              >
                {t('nationalLogin.mainTitle')}
              </CustomTypography>
            </div>

            {!showVerification && (
              <div className="mb-11">
                <CustomTypography
                  type="textThirdThin"
                  style={{
                    color: colors.darkGrey,
                    lineHeight: '1.5',
                  }}
                >
                  {t('nationalLogin.mainDescription')}
                </CustomTypography>
              </div>
            )}
          </div>
        )}

        {/* Main Content */}
        <div className="px-12 pb-3">
          {!showVerification ? (
            <NationalQuickLoginForm onSubmit={handleQuickLoginSubmit} />
          ) : (
            <VerificationCode onSubmit={handleVerificationSubmit} onResendCode={handleResendCode} />
          )}
        </div>

        {/* Footer Links */}
        {!showVerification && (
          <>
            <div className="px-6 pb-6 text-center">
              <div className="flex flex-col items-center justify-center gap-4 text-sm sm:flex-row">
                <Button
                  variant="text"
                  sx={{
                    color: colors.darkGrey,
                    textTransform: 'none',
                    paddingTop: '0',
                  }}
                >
                  <div className="flex items-center gap-1">
                    <CustomTypography type="textFifth" style={{ color: colors.darkGrey }}>
                      {t('nationalLogin.notRegisteredYet')}
                    </CustomTypography>
                    <CustomTypography
                      type="textFifth"
                      style={{
                        color: colors.secondaryBlue,
                        cursor: 'pointer',
                      }}
                    >
                      {t('nationalLogin.clickHere')}
                    </CustomTypography>
                  </div>
                </Button>
                <Button
                  variant="text"
                  sx={{
                    paddingTop: '0',
                    color: colors.darkGrey,
                    textTransform: 'none',
                    backgroundColor: colors.secondaryLightBlue,
                  }}
                >
                  <div>
                    <CustomTypography type="textFifth" style={{ color: colors.darkGrey }}>
                      {t('nationalLogin.loginWithoutAuth')}
                    </CustomTypography>
                  </div>
                </Button>
              </div>

              <div className="text-center">
                <Button
                  variant="text"
                  onClick={() => console.log('fast enter ')}
                  sx={{
                    color: colors.secondaryBlue,
                    textTransform: 'none',
                    minWidth: 'auto',
                    '&:hover': {
                      backgroundColor: 'transparent',
                      textDecoration: 'underline',
                    },
                  }}
                >
                  <CustomTypography type="textFifth" style={{ fontWeight: 600 }}>
                    {t('nationalLogin.quickLoginWithUsername')}
                  </CustomTypography>
                </Button>
              </div>
            </div>
          </>
        )}
      </Paper>
    </div>
  );
};
