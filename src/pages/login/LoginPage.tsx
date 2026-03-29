import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { colors } from '@/theme/colors';
import { useTranslation } from 'react-i18next';
import { CustomTypography } from '@/components/custom-typography';
import { EyeIcon, EyeOffIcon, PivotersIcon } from '@/assets';
import { TextField, FormControl, FormHelperText, InputAdornment, IconButton } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginValidationSchema } from './validation';
import { signIn } from 'aws-amplify/auth';
import { selectIsMobile } from '@/store/slices/system';
import { useAppDispatch, useAppSelector } from '@/store/store';
import * as PATHS from '@/constants/router-paths-constants';
import { useNavigate } from 'react-router-dom';
import { setToast } from '@/store/slices/toast';
import { ToastSeverity } from '@/components/toast/toast';
import { twMerge } from 'tailwind-merge';
// import { useLazyGetCanduditeOnboardingStatusQuery } from '@/apis/core/employee-profile';

interface LoginFormInputs {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const { t } = useTranslation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(loginValidationSchema) as any,
  });
  // const [trigger] = useLazyGetProfileQuery();
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const isMobile = useAppSelector(selectIsMobile);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  // const [getCandidateOnboardingStatus] = useLazyGetCanduditeOnboardingStatusQuery();

  const onSubmit = async (formData: LoginFormInputs) => {
    // the process of validating it the user first login , the validate the otp then change his default password
    try {
      const { nextStep } = await signIn({ username: formData.email, password: formData.password });
      if (nextStep.signInStep === 'DONE') {
        dispatch(
          setToast({
            type: ToastSeverity.SUCCESS,
            message: t('common.welcome'),
            isOpen: true,
          })
        );
        // const data = await trigger().unwrap();

        if (nextStep.signInStep === 'DONE') {
          // do something
        } else {
          dispatch(
            setToast({
              type: ToastSeverity.ERROR,
              message: t('common.generalError'),
              isOpen: true,
            })
          );
          setFormError(t('login.errorMessage'));
        }
      }
      setFormError(null); // Clear error on successful login
    } catch (error) {
      // Handle or log the error
      console.error('Error in password creation flow:', error);
      dispatch(
        setToast({
          type: ToastSeverity.ERROR,
          message: t('common.generalError'),
          isOpen: true,
        })
      );
      setFormError(t('login.errorMessage'));
    }
  };

  return (
    <div className={` ${isMobile ? 'flex h-full flex-col pt-16' : ''}`}>
      {isMobile && (
        <div className="flex flex-row items-center justify-center gap-4">
          <PivotersIcon />
          <CustomTypography type="hThree" className="text-center">
            {t('common.title')}
          </CustomTypography>
        </div>
      )}
      <div
        className={twMerge(
          'mt-16 flex h-full flex-col items-center justify-center',
          isMobile ? 'mt-20 justify-start' : ''
        )}
      >
        <CustomTypography type={isMobile ? 'hMobileOne' : 'hOne'} className="mb-8 text-center text-2xl font-bold">
          {t('login.title')}
        </CustomTypography>

        <form
          className={twMerge(
            'flex max-w-[90vw] flex-col items-center gap-10',
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
                    label={t('login.email')}
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
              name="password"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <FormControl fullWidth error={!!error}>
                  <TextField
                    {...field}
                    label={t('login.password')}
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
          <div className={twMerge('mb-4 flex w-full items-center justify-between', isMobile ? 'justify-end' : '')}>
            <CustomTypography
              onClick={() => navigate(PATHS.FORGOT_PASSWORD)}
              type={isMobile ? 'textSecondaryOne' : 'textSecondaryOne'}
              className="cursor-pointer text-blue-300"
            >
              {t('login.forgotPassword')}
            </CustomTypography>
          </div>
          {formError && <div className="mb-1 w-full text-center font-semibold text-red-600">{formError}</div>}
          <button
            type="submit"
            style={{
              width: isMobile ? '100%' : '60%',
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
            <CustomTypography type={isMobile ? 'buttonMobile' : 'button'}>{t('login.goToLogin')}</CustomTypography>
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
