import { passwordRegex } from '@/constants/api-constants';
import * as yup from 'yup';

export const verifyResetForgotPasswordValidationSchema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  otp: yup.string().min(6, 'OTP must be 6 digits').required('OTP is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required')
    .matches(
      passwordRegex,
      'Password must contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 symbol'
    ),

  reTypePassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password'),
});
