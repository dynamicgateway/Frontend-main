import { passwordRegex } from '@/constants/api-constants';
import * as yup from 'yup';

export const resetPasswordValidationSchema = yup.object().shape({
  prevPassword: yup.string().required('Previous password is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .matches(
      passwordRegex,
      'Password must contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 symbol'
    )
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .matches(
      passwordRegex,
      'Password must contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 symbol'
    )
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password'),
});
