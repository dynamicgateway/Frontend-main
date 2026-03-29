import * as yup from 'yup';

export const verifyUserValidationSchema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  otp: yup.string().length(6, 'OTP must be 6 digits').required('OTP is required'),
});
