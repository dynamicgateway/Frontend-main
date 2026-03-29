import type { SelectableOption } from '@/types/general-types';
import type { Control, FieldError } from 'react-hook-form';
import type { GroupBase, Props as ReactSelectProps } from 'react-select';
import type { ClassNameValue } from 'tailwind-merge';

/**
 * Base props shared by both controlled and uncontrolled FormSelect variants.
 */
interface BaseFormSelectProps
  extends Omit<ReactSelectProps<SelectableOption, false, GroupBase<SelectableOption>>, 'onChange'> {
  /** Optional class name for the container. */
  containerClassName?: ClassNameValue;
  /** Label displayed above the select dropdown. */
  label?: string;
  /** Placeholder text displayed in the dropdown. */
  placeholder?: string;
  /** Error object for displaying validation messages. */
  error?: FieldError;
  /** Toggles disabled state UI/UX. */
  readOnly?: boolean;
}

/**
 * Props for controlled FormSelect using React Hook Form.
 * Requires `control` and `name`, and disallows `onChange`.
 */
interface ControlledFormSelectProps extends BaseFormSelectProps {
  /** React Hook Form's control object for managing the form state. */
  control: Control<any>;
  /** The name of the field in the form. */
  name: string;
  /** Disallowed when using `control`. */
  onChange?: never;
}

/**
 * Props for uncontrolled FormSelect without React Hook Form.
 * Disallows `control` and `name`, and allows `onChange`.
 */
interface UncontrolledFormSelectProps extends BaseFormSelectProps {
  /** React Hook Form's control object is not allowed for uncontrolled FormSelect. */
  control?: undefined;
  /** Name is not required or allowed for uncontrolled FormSelect. */
  name?: undefined;
  /** Callback triggered when the selected value changes. */
  onChange?: (value: SelectableOption['value']) => void;
}

/**
 * Props for the FormSelect component, supporting both controlled and uncontrolled modes.
 */
export type FormSelectProps = ControlledFormSelectProps | UncontrolledFormSelectProps;
