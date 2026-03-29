import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { colors } from '@/theme/colors';
import { useTranslation } from 'react-i18next';
import { CustomTypography } from '@/components/custom-typography';
import { EyeIcon, EyeOffIcon, PivotersIcon } from '@/assets';
import {
  TextField,
  FormControl,
  FormHelperText,
  InputAdornment,
  IconButton,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { signUpValidationSchema } from './validation';
import { signUp } from 'aws-amplify/auth';
import { setToast } from '@/store/slices/toast';
import { ToastSeverity } from '@/components/toast/toast';
import { useAppDispatch } from '@/store/store';
import * as PATHS from '@/constants/router-paths-constants';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUserOnBoardingType } from '@/store/slices/user-data';
import { twMerge } from 'tailwind-merge';
import { selectIsMobile } from '@/store/slices/system';
import { UserDataRole } from '@/types/user-data';

interface LoginFormInputs {
  email: string;
  password: string;
  confirmPassword: string;
  agreeWithTermsAndConditions: boolean;
}

const SignUpPage: React.FC = () => {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      agreeWithTermsAndConditions: false,
    },
    resolver: yupResolver(signUpValidationSchema) as any,
  });
  const dispatch = useAppDispatch();
  const userOnBoardingType = useSelector(selectUserOnBoardingType);
  const isMobile = useSelector(selectIsMobile);
  const onSubmit = async (data: LoginFormInputs) => {
    try {
      let userRoleForBackend;
      if (userOnBoardingType === UserDataRole.JOB_SEEKER) {
        userRoleForBackend = 'candidate';
      } else {
        userRoleForBackend = 'employer';
      }
      await signUp({
        username: data.email,
        password: data.password,
        options: { userAttributes: { email: data.email, 'custom:user_role': userRoleForBackend } },
      });
      navigate(PATHS.VERIFY_USER);
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
      <CustomTypography type={isMobile ? 'hMobileOne' : 'hOne'} className="mt-16 mb-8 text-center text-2xl font-bold">
        {t('signup.title')}
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
                  label={t('createPassword.typePassword')}
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
            name="confirmPassword"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <FormControl fullWidth error={!!error}>
                <TextField
                  {...field}
                  label={t('createPassword.reTypePassword')}
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

        <div className="mb-4 flex w-full items-center gap-4">
          <Controller
            name="agreeWithTermsAndConditions"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <FormControl error={!!error}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                      sx={{ color: colors.primaryBlue }}
                    />
                  }
                  label={
                    <div className="flex gap-1">
                      <CustomTypography
                        type={isMobile ? 'textSecondaryOne' : 'textSecondaryOne'}
                        className="cursor-pointer"
                      >
                        {t('signup.iAgreeWith')}
                      </CustomTypography>
                      <CustomTypography type="textSecondaryOne" className="cursor-pointer text-blue-300">
                        {t('signup.TermsAndConditions')}
                      </CustomTypography>
                    </div>
                  }
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
            height: isMobile ? '3rem' : 'auto',
            marginTop: 16,
            padding: '14px 0',
            border: 'none',
            borderRadius: 999,
            fontWeight: 600,
            fontSize: 18,
            color: colors.white,
            background: colors.primaryBlue,
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(179,12,255,0.10)',
            transition: 'background 0.2s',
          }}
        >
          <CustomTypography type={isMobile ? 'buttonMobile' : 'button'}>{t('signup.goToSignUp')}</CustomTypography>
        </button>
      </form>
    </div>
  );
};

export default SignUpPage;
