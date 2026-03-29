import React from 'react';
import { Button, TextField, FormHelperText } from '@mui/material';
import { Person, Phone } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CustomTypography } from '@/components/custom-typography';
import { colors } from '@/theme/colors';
import { useThemeDirection } from '@/theme/use-theme-direction';
import { newLoginValidationSchema, type NewLoginFormData } from './new-login-validation';

interface QuickLoginFormProps {
  onSubmit: (data: NewLoginFormData) => void;
}

export const QuickLoginForm: React.FC<QuickLoginFormProps> = ({ onSubmit }) => {
  const { t } = useTranslation();
  const { direction } = useThemeDirection();

  // Form handling with validation
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<NewLoginFormData>({
    resolver: yupResolver(newLoginValidationSchema),
    mode: 'onSubmit',
  });

  // Watch both fields to check if they have values
  const idNumber = watch('idNumber');
  const emailMobile = watch('emailMobile');

  // Check if both fields have some content
  const bothFieldsHaveContent = idNumber && emailMobile && idNumber.trim() !== '' && emailMobile.trim() !== '';

  const handleFormSubmit = (data: NewLoginFormData) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6 px-3 pb-6">
      {/* ID Number Input */}
      <div className="px-12">
        <div className="flex flex-wrap gap-1">
          <CustomTypography
            type="textFifthBold"
            style={{
              color: colors.darkGrey,
            }}
          >
            {t('newLogin.idNumberLabel')}
          </CustomTypography>
          <CustomTypography
            type="textFifth"
            style={{
              color: colors.darkGrey,
            }}
          >
            {t('newLogin.idNumberSubtext')}
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
              placeholder={t('newLogin.idNumberPlaceholder')}
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
            {errors.idNumber.message === 'idNumberRequired' && t('newLogin.idNumberRequired')}
            {errors.idNumber.message === 'idNumberInvalid' && t('newLogin.idNumberInvalid')}
            {errors.idNumber.message === 'idNumberNumeric' && t('newLogin.idNumberNumeric')}
          </FormHelperText>
        )}
      </div>

      {/* Email/Mobile Input */}
      <div className="mb-18 px-12">
        <div>
          <CustomTypography
            type="textFifthBold"
            style={{
              color: colors.darkGrey,
            }}
          >
            {t('newLogin.emailMobileLabel')}
          </CustomTypography>
        </div>

        <Controller
          name="emailMobile"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              placeholder={t('newLogin.emailMobilePlaceholder')}
              error={!!errors.emailMobile}
              InputProps={{
                endAdornment: (
                  <Phone
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
                  fontWeight: emailMobile && 400,
                  fontSize: emailMobile && '18px',
                  letterSpacing: emailMobile && '3px',
                },
              }}
            />
          )}
        />
        {errors.emailMobile && (
          <FormHelperText error sx={{ marginTop: '4px' }}>
            {errors.emailMobile.message === 'emailMobileRequired' && t('newLogin.emailMobileRequired')}
            {errors.emailMobile.message === 'emailMobileInvalid' && t('newLogin.emailMobileInvalid')}
          </FormHelperText>
        )}
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
            <CustomTypography type="textThird">{t('newLogin.sendCodeButton')}</CustomTypography>
          </div>
        </Button>
      </div>
    </form>
  );
};
