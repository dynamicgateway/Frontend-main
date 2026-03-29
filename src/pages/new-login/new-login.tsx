import React, { useState } from 'react';
import { Button, Tabs, Tab, Paper } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { CustomTypography } from '@/components/custom-typography';
import { colors } from '@/theme/colors';
import { useThemeDirection } from '@/theme/use-theme-direction';
import { QuickLoginForm } from './quick-login-form';
import { PasswordLoginForm } from './password-login-form';
import type { NewLoginFormData } from './new-login-validation';
import type { PasswordLoginFormData } from '@/pages/new-login/password-login-validation';
import VerificationCode from '@/pages/national-login/verification-code';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`auth-tabpanel-${index}`}
      aria-labelledby={`auth-tab-${index}`}
      {...other}
    >
      {value === index && <div className="pt-6">{children}</div>}
    </div>
  );
}

export const NewLoginPage: React.FC = () => {
  const { t } = useTranslation();
  const [tabValue, setTabValue] = useState(0); // 0 = quick login, 1 = verification code
  const [showVerification, setShowVerification] = useState(false);

  const { direction } = useThemeDirection();

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleQuickLoginSubmit = (data: NewLoginFormData) => {
    // Handle quick login submission and show verification code
    console.log('Quick login submitted:', data);
    setShowVerification(true);
  };

  const handlePasswordLoginSubmit = (data: PasswordLoginFormData) => {
    // Handle password login submission
    console.log('Password login submitted:', data);
  };

  const handleVerificationSubmit = (code: string) => {
    // Handle verification code submission
    console.log('Verification code submitted:', code);
  };

  const handleResendCode = () => {
    // Handle resend code
    console.log('Resend code requested');
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
        {/* Tabs */}
        <div className="pt-6">
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            variant="fullWidth"
            sx={{
              '& .MuiTab-root': {
                color: colors.darkGrey,
                minHeight: '48px',
                borderBottom: '3px solid',
                borderBottomColor: colors.gray,
                '&.Mui-selected': {
                  color: colors.primaryBlue,
                  borderBottomColor: colors.primaryBlue,
                },
              },
              '& .MuiTabs-indicator': {
                backgroundColor: colors.primaryBlue,
                height: '3px',
              },
            }}
          >
            <Tab
              label={
                <div>
                  <CustomTypography type={tabValue === 0 ? 'textFour' : 'textFourThin'}>
                    {t('newLogin.quickLogin')}
                  </CustomTypography>
                </div>
              }
              id="auth-tab-0"
              aria-controls="auth-tabpanel-0"
            />
            <Tab
              label={
                <div>
                  <CustomTypography type={tabValue === 1 ? 'textFour' : 'textFourThin'}>
                    {t('newLogin.iHavePassword')}
                  </CustomTypography>
                </div>
              }
              id="auth-tab-1"
              aria-controls="auth-tabpanel-1"
            />
          </Tabs>
        </div>

        {/* Main Title */}
        <div className="px-12 pt-12 text-center">
          <div className="mb-11">
            <CustomTypography
              type="hThree"
              style={{
                color: colors.primaryBlue,
                marginBottom: '16px',
              }}
            >
              {t('newLogin.mainTitle')}
            </CustomTypography>
          </div>

          {!showVerification && (
            <div className="mb-12">
              <CustomTypography
                type="textThirdThin"
                style={{
                  color: colors.darkGrey,
                  lineHeight: '1.5',
                }}
              >
                {t('newLogin.mainDescription')}
              </CustomTypography>
            </div>
          )}
        </div>

        {/* Tab Panels */}
        <TabPanel value={tabValue} index={0}>
          {/* Quick Login Form */}
          {!showVerification ? (
            <QuickLoginForm onSubmit={handleQuickLoginSubmit} />
          ) : (
            <VerificationCode
              onSubmit={handleVerificationSubmit}
              onResendCode={handleResendCode}
              // namespace="verificationCode"
            />
          )}
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          {/* Password Login Form */}
          <PasswordLoginForm onSubmit={handlePasswordLoginSubmit} />
        </TabPanel>

        {/* Footer Links */}
        {!showVerification && (
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
                    {t('newLogin.notRegisteredYet')}
                  </CustomTypography>
                  <CustomTypography
                    type="textFifth"
                    style={{
                      color: colors.secondaryBlue,
                      cursor: 'pointer',
                    }}
                  >
                    {t('newLogin.clickHere')}
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
                    {t('newLogin.loginWithoutAuth')}
                  </CustomTypography>
                </div>
              </Button>
            </div>
          </div>
        )}
      </Paper>
    </div>
  );
};
