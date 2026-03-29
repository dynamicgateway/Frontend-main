import type { TextareaHTMLAttributes } from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';

/**
 * Props for the FormInputTextArea component.
 */
export interface FormInputTextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Class name for the container */
  containerClassName?: string;
  /** Label for the textarea input */
  label?: string;
  /** Error message object */
  error?: { message?: string };
  /** React Hook Form's register function */
  register?: UseFormRegisterReturn;
  /** Toggles disabled state UI/UX. */
  readOnly?: boolean;
}
