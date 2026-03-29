import * as yup from 'yup';

// Validation schema for password login form
export const passwordLoginValidationSchema = yup.object({
  payerNumber: yup
    .string()
    .required('payerNumberRequired')
    .matches(/^\d{9}$/, 'payerNumberInvalid')
    .test('is-numeric', 'payerNumberNumeric', (value) => {
      return /^\d+$/.test(value || '');
    }),

  password: yup.string().required('passwordRequired').min(6, 'passwordMinLength'),
});

// Type for the form data
export type PasswordLoginFormData = yup.InferType<typeof passwordLoginValidationSchema>;
