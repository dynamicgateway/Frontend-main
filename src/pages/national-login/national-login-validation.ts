import * as yup from 'yup';

export interface NationalLoginFormData {
  idNumber: string;
  password: string;
}

export const nationalLoginValidationSchema = yup.object({
  idNumber: yup
    .string()
    .required('idNumberRequired')
    .matches(/^\d{9}$/, 'idNumberInvalid')
    .test('is-numeric', 'idNumberNumeric', (value) => {
      return /^\d+$/.test(value);
    }),
  password: yup.string().required('passwordRequired').min(6, 'passwordMinLength'),
});
