import React from 'react';
import { Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CustomTypography } from '@/components/custom-typography';
import { colors } from '@/theme/colors';
import { useThemeDirection } from '@/theme/use-theme-direction';
import FormioRenderer from '@/components/FormioRenderer';

export const FormioLoginPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { direction } = useThemeDirection();

  const handleLoginSubmit = (submission: any) => {
    console.log('Login form submitted:', submission);
    
    // Extract username and password from submission
    const { data } = submission;
    const username = data.username || data.email;
    const password = data.password;

    // TODO: Replace with actual authentication logic
    if (username && password) {
      // Simulate successful login
      console.log('Authenticating user:', username);
      
      // Navigate to main menu on success
      navigate('/main-menu');
    } else {
      console.error('Missing credentials');
    }
  };

  const handleLoginError = (error: any) => {
    console.error('Login form error:', error);
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
        {/* Header */}
        <div className="pt-8 px-12 pb-4">
          <CustomTypography
            type="h2"
            style={{
              color: colors.primaryBlue,
              textAlign: 'center',
              fontWeight: 600,
            }}
          >
            {t('newLogin.title') || 'כניסה למערכת'}
          </CustomTypography>
          <CustomTypography
            type="textFifth"
            style={{
              color: colors.darkGrey,
              textAlign: 'center',
              marginTop: '8px',
            }}
          >
            התחברות באמצעות Dynamic Gateway
          </CustomTypography>
        </div>

        {/* Form.io Login Form */}
        <div className="px-6 pb-8">
          <FormioRenderer
            formId="form-muni-login"
            apiBaseUrl="http://localhost:5173"
            onSubmit={handleLoginSubmit}
            onError={handleLoginError}
          />
        </div>
      </Paper>
    </div>
  );
};

export default FormioLoginPage;
