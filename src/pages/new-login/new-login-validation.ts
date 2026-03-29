import * as yup from 'yup';
import { isValidIsraeliID } from '@/utils/login-utils';

// Validation schema for the new-login form
export const newLoginValidationSchema = yup.object({
  idNumber: yup
    .string()
    .required('idNumberRequired') // ID number is required
    .matches(/^\d{9}$/, 'idNumberInvalid') // Must be exactly 9 digits
    .test('is-valid-israeli-id', 'idNumberInvalid', (value) => {
      if (!value) return false;
      return isValidIsraeliID(value);
    }),

  emailMobile: yup
    .string()
    .required('emailMobileRequired') // Email or mobile is required
    .test('email-or-phone', 'emailMobileInvalid', (value) => {
      if (!value) return false;

      // Check if it's a valid email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailRegex.test(value)) return true;

      // Check if it's a valid phone number (10 digits starting with 0)
      const phoneRegex = /^0\d{9}$/;
      if (phoneRegex.test(value)) return true;

      return false;
    }),
});

// Type for the form data
export type NewLoginFormData = yup.InferType<typeof newLoginValidationSchema>;
