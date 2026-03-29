import React from 'react';
import { Button, TextField, FormHelperText } from '@mui/material';
import { Person, Visibility, VisibilityOff } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CustomTypography } from '@/components/custom-typography';
import { colors } from '@/theme/colors';
import { useThemeDirection } from '@/theme/use-theme-direction';
import { passwordLoginValidationSchema, type PasswordLoginFormData } from './password-login-validation';

interface PasswordLoginFormProps {
  onSubmit: (data: PasswordLoginFormData) => void;
}

export const PasswordLoginForm: React.FC<PasswordLoginFormProps> = ({ onSubmit }) => {
  const { t } = useTranslation();
  const { direction } = useThemeDirection();
  const [showPassword, setShowPassword] = React.useState(false);

  // Form handling with validation
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<PasswordLoginFormData>({
    resolver: yupResolver(passwordLoginValidationSchema),
    mode: 'onSubmit',
  });

  // Watch both fields to check if they have values
  const payerNumber = watch('payerNumber');
  const password = watch('password');

  // Check if both fields have some content
  const bothFieldsHaveContent = payerNumber && password && payerNumber.trim() !== '' && password.trim() !== '';

  const handleFormSubmit = (data: PasswordLoginFormData) => {
    onSubmit(data);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6 px-3 pb-6">
      {/* Payer Number Input */}
      <div className="px-12">
        <div className="flex flex-wrap gap-1">
          <CustomTypography
            type="textFifthBold"
            style={{
              color: colors.darkGrey,
            }}
          >
            {t('passwordLogin.payerNumberLabel')}
          </CustomTypography>
        </div>

        <Controller
          name="payerNumber"
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
              placeholder={t('passwordLogin.payerNumberPlaceholder')}
              error={!!errors.payerNumber}
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
                  fontWeight: payerNumber && 400,
                  fontSize: payerNumber ? '18px' : '16px',
                  letterSpacing: payerNumber && '3px',
                },
              }}
            />
          )}
        />
        {errors.payerNumber && (
          <FormHelperText error sx={{ marginTop: '4px' }}>
            {errors.payerNumber.message === 'payerNumberRequired' && t('passwordLogin.payerNumberRequired')}
            {errors.payerNumber.message === 'payerNumberInvalid' && t('passwordLogin.payerNumberInvalid')}
            {errors.payerNumber.message === 'payerNumberNumeric' && t('passwordLogin.payerNumberNumeric')}
          </FormHelperText>
        )}
      </div>

      {/* Password Input */}
      <div className="mb-11 px-12">
        <div>
          <CustomTypography
            type="textFifthBold"
            style={{
              color: colors.darkGrey,
            }}
          >
            {t('passwordLogin.passwordLabel')}
          </CustomTypography>
        </div>

        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              type={showPassword ? 'text' : 'password'}
              placeholder={t('passwordLogin.passwordPlaceholder')}
              error={!!errors.password}
              InputProps={{
                endAdornment: (
                  <div onClick={togglePasswordVisibility} style={{ cursor: 'pointer' }}>
                    {showPassword ? (
                      <VisibilityOff
                        sx={{
                          color: colors.gray,
                          margin: '0 12px',
                          fontSize: '20px',
                        }}
                      />
                    ) : (
                      <Visibility
                        sx={{
                          color: colors.gray,
                          margin: '0 12px',
                          fontSize: '20px',
                        }}
                      />
                    )}
                  </div>
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
            {errors.password.message === 'passwordRequired' && t('passwordLogin.passwordRequired')}
            {errors.password.message === 'passwordMinLength' && t('passwordLogin.passwordMinLength')}
          </FormHelperText>
        )}

        {/* Forgot Password Link */}
        <div className="text-right">
          <Button
            variant="text"
            onClick={() => console.log('Forgot password clicked')}
            sx={{
              color: colors.secondaryBlue,
              textTransform: 'none',
              padding: '4px 8px',
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
          className="p-4"
          sx={{
            backgroundColor: colors.secondaryBlue,
            color: colors.white,
            borderRadius: '50px',
            textTransform: 'none',
            height: '50px',
            '& .MuiButton-endIcon': {
              marginLeft: '8px',
              marginRight: '8px',
            },
            '&:disabled': {
              backgroundColor: colors.darkGrey,
              color: colors.white,
            },
          }}
          endIcon={<span className="text-lg">{direction === 'rtl' ? '>' : '<'}</span>}
        >
          <div>
            <CustomTypography type="textThird">{t('passwordLogin.loginButton')}</CustomTypography>
          </div>
        </Button>
      </div>
    </form>
  );
};
