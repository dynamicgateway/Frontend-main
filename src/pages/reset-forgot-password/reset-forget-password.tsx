import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { colors } from '@/theme/colors';
import { useTranslation } from 'react-i18next';
import { CustomTypography } from '@/components/custom-typography';
import { yupResolver } from '@hookform/resolvers/yup';
import { verifyResetForgotPasswordValidationSchema } from './validation';
import { confirmResetPassword } from 'aws-amplify/auth';
import { setToast } from '@/store/slices/toast';
import { ToastSeverity } from '@/components/toast/toast';
import { useAppDispatch } from '@/store/store';
import { EyeIcon, EyeOffIcon, PivotersIcon } from '@/assets';
import { useSelector } from 'react-redux';
import { selectIsMobile } from '@/store/slices/system';
import { twMerge } from 'tailwind-merge';
import { TextField, FormControl, FormHelperText, InputAdornment, IconButton } from '@mui/material';
interface VerifyUserFormInputs {
  email: string;
  otp: string;
  password: string;
  reTypePassword: string;
}

const SignUpPage: React.FC = () => {
  const { t } = useTranslation();
  const isMobile = useSelector(selectIsMobile);
  const [showPassword, setShowPassword] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyUserFormInputs>({
    defaultValues: {
      email: '',
      otp: '',
      password: '',
      reTypePassword: '',
    },
    resolver: yupResolver(verifyResetForgotPasswordValidationSchema) as any,
  });
  const dispatch = useAppDispatch();
  const onSubmit = async (data: VerifyUserFormInputs) => {
    try {
      await confirmResetPassword({
        username: data.email,
        confirmationCode: data.otp.toString(),
        newPassword: data.password,
      });
      dispatch(
        setToast({
          type: ToastSeverity.SUCCESS,
          message: t('resetForgotPassword.passwordUpdated'),
          isOpen: true,
        })
      );
    } catch (error) {
      console.error(error);
      dispatch(
        setToast({
          type: ToastSeverity.ERROR,
          message: t('common.generalError'),
          isOpen: true,
        })
      );
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
        {t('resetForgotPassword.title')}
      </CustomTypography>
      <form
        className={twMerge(
          'flex max-w-[90vw] flex-col items-center gap-5',
          isMobile ? 'w-full gap-2' : 'w-[40%] max-w-[40vw]'
        )}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="w-full">
          <Controller
            name="email"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <FormControl fullWidth error={!!error}>
                <TextField
                  {...field}
                  label={t('resetForgotPassword.email')}
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

        <div className="w-full">
          <Controller
            name="otp"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <FormControl fullWidth error={!!error}>
                <TextField
                  {...field}
                  label={t('resetForgotPassword.reTypeVerificationPassword')}
                  type="text"
                  variant="outlined"
                  size="medium"
                  fullWidth
                />
                {error && <FormHelperText>{error.message}</FormHelperText>}
              </FormControl>
            )}
          />
        </div>

        <div className="w-full">
          <Controller
            name="password"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <FormControl fullWidth error={!!error}>
                <TextField
                  {...field}
                  label={t('resetForgotPassword.password')}
                  type={showPassword ? 'text' : 'password'}
                  variant="outlined"
                  size="medium"
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword((prev) => !prev)}
                          edge="end"
                          title={showPassword ? 'Hide Password' : 'Show Password'}
                        >
                          {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                {error && <FormHelperText>{error.message}</FormHelperText>}
              </FormControl>
            )}
          />
        </div>
        <div className="w-full">
          <Controller
            name="reTypePassword"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <FormControl fullWidth error={!!error}>
                <TextField
                  {...field}
                  label={t('resetForgotPassword.reTypePassword')}
                  type={showPassword ? 'text' : 'password'}
                  variant="outlined"
                  size="medium"
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword((prev) => !prev)}
                          edge="end"
                          title={showPassword ? 'Hide Password' : 'Show Password'}
                        >
                          {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                {error && <FormHelperText>{error.message}</FormHelperText>}
              </FormControl>
            )}
          />
        </div>
        <button
          type="submit"
          style={{
            width: isMobile ? '100%' : '60%',
            marginTop: 16,
            padding: isMobile ? '0' : '14px 0',
            border: 'none',
            borderRadius: 999,
            color: colors.white,
            background: colors.primaryBlue,
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(179,12,255,0.10)',
            transition: 'background 0.2s',
            height: isMobile ? '3rem' : 'auto',
          }}
        >
          <CustomTypography type={isMobile ? 'buttonMobile' : 'button'}>
            {t('resetForgotPassword.submit')}
          </CustomTypography>
        </button>
      </form>
    </div>
  );
};

export default SignUpPage;
