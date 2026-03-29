import type { InputHTMLAttributes } from 'react';
import type { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import type { ClassNameValue } from 'tailwind-merge';

/**
 * Base props for the FormInput component.
 */
interface BaseFormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Optional className for styling the container div. */
  containerClassName?: ClassNameValue;
  /** Label displayed above the input element. */
  label?: string;
  /** Placeholder for the input element. */
  placeholder?: string;
  /** React Hook Form's register prop for form state management. */
  register?: UseFormRegisterReturn;
  /** Error object for displaying validation messages. */
  error?: FieldError;
}

/**
 * Props for when the input is read-only (secured is not allowed).
 */
interface ReadOnlyProps extends BaseFormInputProps {
  /** Toggles disabled state UI/UX. */
  readOnly?: boolean;
  /** Secured cannot be passed when readOnly is true. */
  secured?: false;
}

/**
 * Props for when the input is secured (readOnly is not allowed).
 */
interface SecuredProps extends BaseFormInputProps {
  /** Indicates if the input should be secured (e.g., for passwords). */
  secured?: boolean;
  /** ReadOnly cannot be passed when secured is true. */
  readOnly?: false;
}

/**
 * Props for the FormInput component, enforcing mutually exclusive secured and readOnly states.
 */
export type FormInputProps = ReadOnlyProps | SecuredProps;
