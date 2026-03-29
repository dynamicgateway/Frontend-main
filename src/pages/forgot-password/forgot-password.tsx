import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { colors } from '@/theme/colors';
import { useTranslation } from 'react-i18next';
import { CustomTypography } from '@/components/custom-typography';
import { TextField, FormControl, FormHelperText } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { forgotPasswordValidationSchema } from './validation';
import { resetPassword } from 'aws-amplify/auth';
import { setToast } from '@/store/slices/toast';
import { ToastSeverity } from '@/components/toast/toast';
import { useAppDispatch } from '@/store/store';
import * as PATHS from '@/constants/router-paths-constants';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsMobile } from '@/store/slices/system';
import { twMerge } from 'tailwind-merge';
import { PivotersIcon } from '@/assets';
interface ResetPasswordFormInputs {
  email: string;
}

const ResetPasswordPage: React.FC = () => {
  const { t } = useTranslation();
  const isMobile = useSelector(selectIsMobile);
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ResetPasswordFormInputs>({
    defaultValues: {
      email: '',
    },
    resolver: yupResolver(forgotPasswordValidationSchema) as any,
  });
  const [formError, setFormError] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const emailValue = watch('email');
  const navigate = useNavigate();
  useEffect(() => {
    if (formError && emailValue) {
      setFormError(null);
    }
  }, [emailValue, formError]);

  const onSubmit = async (data: ResetPasswordFormInputs) => {
    try {
      const { nextStep } = await resetPassword({ username: data.email });
      if (nextStep.resetPasswordStep === 'CONFIRM_RESET_PASSWORD_WITH_CODE') {
        dispatch(
          setToast({
            type: ToastSeverity.SUCCESS,
            message: t('forgotPassword.verificationMailSent'),
            isOpen: true,
          })
        );
        setTimeout(() => {
          navigate(PATHS.RESET_FORGOT_PASSWORD);
        }, 2000);
      }
    } catch (err: any) {
      dispatch(
        setToast({
          type: ToastSeverity.ERROR,
          message: t('common.generalError'),
          isOpen: true,
        })
      );
      console.error('Error in forgot password flow:', err);
      console.error('❌ Failed to send code:', err.message);
    }
  };

  return (
    <div className={twMerge('flex min-h-[100vh] flex-col items-center bg-white', isMobile ? 'pt-16' : '')}>
      {isMobile && (
        <div className="flex flex-row items-center justify-center gap-4">
          <PivotersIcon />
          <CustomTypography type="hThree" className="text-center">
            {t('common.title')}
          </CustomTypography>
        </div>
      )}
      <CustomTypography
        type={isMobile ? 'hMobileOne' : 'hOne'}
        className={twMerge('mt-16 mb-8 text-center font-bold', isMobile ? 'mt-20' : '')}
      >
        {t('forgotPassword.title')}
      </CustomTypography>

      <form
        className={twMerge(
          'flex max-w-[90vw] flex-col items-center gap-5',
          isMobile ? 'w-full gap-2' : 'w-[40%] max-w-[40vw]'
        )}
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <div className="w-full">
          <Controller
            name="email"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <FormControl fullWidth error={!!error}>
                <TextField
                  {...field}
                  label={t('forgotPassword.email')}
                  type="email"
                  variant="outlined"
                  size="medium"
                  fullWidth
                />
                {error && <FormHelperText>{error.message}</FormHelperText>}
              </FormControl>
            )}
          />
        </div>

        {formError && <div className="mb-2 w-full text-center font-semibold text-red-600">{formError}</div>}
        <button
          type="submit"
          disabled={!emailValue}
          style={{
            width: '60%',
            marginTop: 16,
            padding: '14px 0',
            border: 'none',
            borderRadius: 999,
            fontWeight: 600,
            fontSize: 18,
            color: colors.white,
            background: colors.primaryBlue,
            cursor: !emailValue ? 'not-allowed' : 'pointer',
            boxShadow: '0 2px 8px rgba(179,12,255,0.10)',
            transition: 'background 0.2s',
            opacity: !emailValue ? 0.5 : 1,
          }}
        >
          <CustomTypography type={isMobile ? 'buttonMobile' : 'button'}>{t('forgotPassword.submit')}</CustomTypography>
        </button>
      </form>
    </div>
  );
};

export default ResetPasswordPage;
