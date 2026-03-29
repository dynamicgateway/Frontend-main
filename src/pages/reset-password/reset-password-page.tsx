import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { colors } from '@/theme/colors';
import { useTranslation } from 'react-i18next';
import { CustomTypography } from '@/components/custom-typography';
import { EyeIcon, EyeOffIcon, PivotersIcon } from '@/assets';
import { yupResolver } from '@hookform/resolvers/yup';
import { resetPasswordValidationSchema } from './validation';
import { handleChangePassword, isUserSignedIn } from '@/utils/amplify-utils';
import { useNavigate } from 'react-router-dom';
import { ToastSeverity } from '@/components/toast/toast';
import { setToast } from '@/store/slices/toast';
import { useAppDispatch } from '@/store/store';
import { useSelector } from 'react-redux';
import { selectIsMobile } from '@/store/slices/system';
import { twMerge } from 'tailwind-merge';
import * as PATHS from '@/constants/router-paths-constants';
interface ResetPasswordFormInputs {
  prevPassword: string;
  password: string;
  confirmPassword: string;
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
      prevPassword: '',
      password: '',
      confirmPassword: '',
    },
    resolver: yupResolver(resetPasswordValidationSchema) as any,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const passwordValue = watch('password');
  const prevPasswordValue = watch('prevPassword');
  const confirmPasswordValue = watch('confirmPassword');
  const navigate = useNavigate();
  // Clear error if passwords match on change
  useEffect(() => {
    if (formError && passwordValue === confirmPasswordValue) {
      setFormError(null);
    }
  }, [passwordValue, confirmPasswordValue, formError]);
  const dispatch = useAppDispatch();
  const onSubmit = async (data: ResetPasswordFormInputs) => {
    // Check if passwords match before proceeding
    if (data.password !== data.confirmPassword) {
      setFormError(t('resetPassword.errorMessagePasswordsDoNotMatch'));
      return;
    }
    // Handle reset password
    try {
      const isSignedIn = await isUserSignedIn();
      if (isSignedIn) {
        const { success } = await handleChangePassword(data.prevPassword, data.password);
        if (success) {
          dispatch(
            setToast({
              type: ToastSeverity.SUCCESS,
              message: t('common.generalSuccess'),
              isOpen: true,
            })
          );
          navigate(PATHS.LOGIN);
        } else {
          dispatch(
            setToast({
              type: ToastSeverity.ERROR,
              message: t('common.generalError'),
              isOpen: true,
            })
          );
        }
      } else {
        dispatch(
          setToast({
            type: ToastSeverity.ERROR,
            message: t('common.generalError'),
            isOpen: true,
          })
        );
      }
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
        {t('resetPassword.title')}
      </CustomTypography>
      <form
        className={twMerge(
          'flex max-w-[90vw] flex-col items-center gap-5',
          isMobile ? 'w-full gap-2' : 'w-[40%] max-w-[40vw]'
        )}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="relative w-full">
          <label className="mb-2 block">
            <CustomTypography type={isMobile ? 'textSecondaryOne' : 'textSecondaryOne'}>
              {t('resetPassword.prevPassword')}
            </CustomTypography>
          </label>
          <Controller
            name="prevPassword"
            control={control}
            render={({ field }) => (
              <>
                <input
                  type={showPassword ? 'text' : 'password'}
                  {...field}
                  style={{
                    borderRadius: 8,
                    border: 'none',
                    background: colors.lightGrey,
                    fontSize: 16,
                    outline: 'none',
                  }}
                  className="mb-0 w-full border-none p-4"
                  // placeholder={t('login.password')}
                />
                {errors.password && <span className="text-xs text-red-500">{errors.password.message}</span>}
              </>
            )}
          />
          <span
            className="absolute top-12 right-4 cursor-pointer p-2 text-2xl text-gray-500"
            title={showPassword ? 'Hide Password' : 'Show Password'}
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
          </span>
        </div>
        <div className="relative w-full">
          <label className="mb-2 block">
            <CustomTypography type={isMobile ? 'textSecondaryOne' : 'textSecondaryOne'}>
              {t('createPassword.typePassword')}
            </CustomTypography>
          </label>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <>
                <input
                  type={showPassword ? 'text' : 'password'}
                  {...field}
                  style={{
                    borderRadius: 8,
                    border: 'none',
                    background: colors.lightGrey,
                    fontSize: 16,
                    outline: 'none',
                  }}
                  className="mb-0 w-full border-none p-4"
                  // placeholder={t('login.password')}
                />
                {errors.password && <span className="text-xs text-red-500">{errors.password.message}</span>}
              </>
            )}
          />
          <span
            className="absolute top-12 right-4 cursor-pointer p-2 text-2xl text-gray-500"
            title={showPassword ? 'Hide Password' : 'Show Password'}
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
          </span>
        </div>
        <div className="relative w-full">
          <label className="mb-2 block">
            <CustomTypography type={isMobile ? 'textSecondaryOne' : 'textSecondaryOne'}>
              {t('createPassword.reTypePassword')}
            </CustomTypography>
          </label>
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <>
                <input
                  type={showPassword ? 'text' : 'password'}
                  {...field}
                  style={{
                    borderRadius: 8,
                    border: 'none',
                    background: colors.lightGrey,
                    fontSize: 16,
                    outline: 'none',
                  }}
                  className="mb-0 w-full border-none p-4"
                  // placeholder={t('login.password')}
                />
                {errors.confirmPassword && (
                  <span className="text-xs text-red-500">{errors.confirmPassword.message}</span>
                )}
              </>
            )}
          />
          <span
            className="absolute top-12 right-4 cursor-pointer p-2 text-2xl text-gray-500"
            title={showPassword ? 'Hide Password' : 'Show Password'}
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
          </span>
        </div>
        {formError && <div className="mb-2 w-full text-center font-semibold text-red-600">{formError}</div>}
        <button
          type="submit"
          disabled={!(prevPasswordValue && passwordValue && confirmPasswordValue)}
          style={{
            width: isMobile ? '100%' : '60%',
            marginTop: 16,
            padding: isMobile ? '0' : '14px 0',
            border: 'none',
            borderRadius: 999,
            color: colors.white,
            background: colors.primaryBlue,
            cursor: !(prevPasswordValue && passwordValue && confirmPasswordValue) ? 'not-allowed' : 'pointer',
            boxShadow: '0 2px 8px rgba(179,12,255,0.10)',
            transition: 'background 0.2s',
            opacity: !(prevPasswordValue && passwordValue && confirmPasswordValue) ? 0.5 : 1,
            height: isMobile ? '3rem' : 'auto',
          }}
        >
          <CustomTypography type={isMobile ? 'buttonMobile' : 'button'}>{t('resetPassword.submit')}</CustomTypography>
        </button>
      </form>
    </div>
  );
};

export default ResetPasswordPage;
