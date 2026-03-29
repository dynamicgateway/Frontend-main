import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { colors } from '@/theme/colors';
import { useTranslation } from 'react-i18next';
import { CustomTypography } from '@/components/custom-typography';
import { TextField, FormControl, FormHelperText } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { verifyUserValidationSchema } from './validation';
import { confirmSignUp } from 'aws-amplify/auth';
import { setToast } from '@/store/slices/toast';
import { ToastSeverity } from '@/components/toast/toast';
import { useAppDispatch } from '@/store/store';
import * as PATHS from '@/constants/router-paths-constants';
import { useNavigate } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import { selectIsMobile } from '@/store/slices/system';
import { useSelector } from 'react-redux';
import { PivotersIcon } from '@/assets';

interface VerifyUserFormInputs {
  email: string;
  otp: string;
}

const SignUpPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyUserFormInputs>({
    defaultValues: {
      email: '',
      otp: '',
    },
    resolver: yupResolver(verifyUserValidationSchema) as any,
  });
  const isMobile = useSelector(selectIsMobile);
  const dispatch = useAppDispatch();
  const onSubmit = async (data: VerifyUserFormInputs) => {
    try {
      await confirmSignUp({
        username: data.email,
        confirmationCode: data.otp.toString(),
      });
      dispatch(
        setToast({
          type: ToastSeverity.SUCCESS,
          message: t('verifyUser.userVerified'),
          isOpen: true,
        })
      );
      setTimeout(() => {
        navigate(PATHS.LOGIN);
      }, 2000);
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
    <div className="flex flex-col items-center bg-white">
      {isMobile && (
        <div className="mt-20 flex flex-row items-center justify-center gap-4">
          <PivotersIcon />
          <CustomTypography type="hThree" className="text-center">
            {t('common.title')}
          </CustomTypography>
        </div>
      )}
      <CustomTypography type={isMobile ? 'hMobileOne' : 'hOne'} className="mt-16 mb-8 text-center font-bold">
        {t('signup.title')}
      </CustomTypography>
      <CustomTypography type={isMobile ? 'hMobileFour' : 'hFour'} className="mb-8 text-center font-bold">
        {t('signup.emailSent')}
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
                  label={t('verifyUser.email')}
                  type="email"
                  variant="outlined"
                  size="medium"
                  fullWidth
                  placeholder={t('login.email')}
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
                  label={t('verifyUser.verificationCode')}
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
          <CustomTypography type={isMobile ? 'buttonMobile' : 'button'} className="text-center">
            {t('verifyUser.submit')}
          </CustomTypography>
        </button>
      </form>
    </div>
  );
};

export default SignUpPage;
