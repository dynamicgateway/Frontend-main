import React from 'react';
import { Button, TextField, FormHelperText } from '@mui/material';
import { Person, Lock, Security } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CustomTypography } from '@/components/custom-typography';
import { colors } from '@/theme/colors';
import { useThemeDirection } from '@/theme/use-theme-direction';
import { nationalLoginValidationSchema, type NationalLoginFormData } from './national-login-validation';
import { LoginShieldIcon } from '@/assets';

interface NationalQuickLoginFormProps {
  onSubmit: (data: NationalLoginFormData) => void;
}

export const NationalQuickLoginForm: React.FC<NationalQuickLoginFormProps> = ({ onSubmit }) => {
  const { t } = useTranslation();
  const { direction } = useThemeDirection();

  // Form handling with validation
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<NationalLoginFormData>({
    resolver: yupResolver(nationalLoginValidationSchema),
    mode: 'onSubmit',
  });

  // Watch both fields to check if they have values
  const idNumber = watch('idNumber');
  const password = watch('password');

  // Check if both fields have some content
  const bothFieldsHaveContent = idNumber && password && idNumber.trim() !== '' && password.trim() !== '';

  const handleFormSubmit = (data: NationalLoginFormData) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6 px-3">
      {/* ID Number Input */}
      <div className="">
        <div className="flex flex-wrap gap-1">
          <CustomTypography
            type="textFifthBold"
            style={{
              color: colors.darkGrey,
            }}
          >
            {t('nationalLogin.idNumberLabel')}
          </CustomTypography>
          <CustomTypography
            type="textFifth"
            style={{
              color: colors.darkGrey,
            }}
          >
            {t('nationalLogin.idNumberSubtext')}
          </CustomTypography>
        </div>

        <Controller
          name="idNumber"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              type="number"
              inputProps={{
                max: 999999999, // 9 digits maximum
                min: 0,
                step: 1,
              }}
              placeholder={t('nationalLogin.idNumberPlaceholder')}
              error={!!errors.idNumber}
              onChange={(e) => {
                const value = e.target.value;
                // Only allow up to 9 digits
                if (value.length <= 9) {
                  field.onChange(e);
                }
              }}
              InputProps={{
                endAdornment: (
                  <Person
                    sx={{
                      color: colors.gray,
                      margin: '0 12px',
                      fontSize: '20px',
                    }}
                  />
                ),
              }}
              sx={{
                '& .MuiInputBase-input': {
                  fontFamily: 'Rubik, sans-serif',
                  fontWeight: idNumber && 400,
                  fontSize: idNumber ? '18px' : '16px',
                  letterSpacing: idNumber && '3px',
                },
              }}
            />
          )}
        />
        {errors.idNumber && (
          <FormHelperText error sx={{ marginTop: '4px' }}>
            {errors.idNumber.message === 'idNumberRequired' && t('nationalLogin.idNumberRequired')}
            {errors.idNumber.message === 'idNumberInvalid' && t('nationalLogin.idNumberInvalid')}
            {errors.idNumber.message === 'idNumberNumeric' && t('nationalLogin.idNumberNumeric')}
          </FormHelperText>
        )}
      </div>

      {/* Password Input */}
      <div className="mb-18">
        <div>
          <CustomTypography
            type="textFifthBold"
            style={{
              color: colors.darkGrey,
            }}
          >
            {t('nationalLogin.passwordLabel')}
          </CustomTypography>
        </div>

        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              type="password"
              placeholder={t('nationalLogin.passwordPlaceholder')}
              error={!!errors.password}
              InputProps={{
                endAdornment: (
                  <Lock
                    sx={{
                      color: colors.gray,
                      margin: '0 12px',
                      fontSize: '20px',
                    }}
                  />
                ),
              }}
              sx={{
                '& .MuiInputBase-input': {
                  fontFamily: 'Rubik, sans-serif',
                  fontWeight: password && 400,
                  fontSize: password && '18px',
                  letterSpacing: password && '3px',
                },
              }}
            />
          )}
        />
        {errors.password && (
          <FormHelperText error sx={{ marginTop: '4px' }}>
            {errors.password.message === 'passwordRequired' && t('nationalLogin.passwordRequired')}
            {errors.password.message === 'passwordMinLength' && t('nationalLogin.passwordMinLength')}
          </FormHelperText>
        )}
        {/* Forgot Password Link */}
        <div className="pt-2 text-right">
          <Button
            variant="text"
            onClick={() => console.log('Forgot password clicked')}
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
              {t('passwordLogin.forgotPassword')}
            </CustomTypography>
          </Button>
        </div>
      </div>

      <div className="px-12">
        {/* Submit Button */}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={!bothFieldsHaveContent}
          className="flex w-full"
          sx={{
            backgroundColor: colors.primaryBlue,
            color: colors.white,
            borderRadius: '8px',
            textTransform: 'none',
            height: '56px',
            padding: '0 16px',
            justifyContent: 'space-between',
            '&:disabled': {
              backgroundColor: colors.darkGrey,
              color: colors.white,
            },
          }}
          startIcon={
            direction === 'rtl' && (
              <div style={{ borderLeft: '2px solid #fff ', paddingLeft: '10px' }}>
                <LoginShieldIcon />
              </div>
            )
          }
          endIcon={
            direction === 'ltr' && (
              <div style={{ borderLeft: '2px solid #fff ', paddingLeft: '10px' }}>
                <LoginShieldIcon />
              </div>
            )
          }
        >
          {direction === 'ltr' && <div className="text-transparent">.</div>}
          <div>
            <CustomTypography type="textThird">{t('nationalLogin.loginButton')}</CustomTypography>
          </div>
          {direction === 'rtl' && <div className="text-transparent">.</div>}
        </Button>
      </div>
    </form>
  );
};
