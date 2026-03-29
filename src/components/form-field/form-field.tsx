import { CustomTypography } from '@/components/custom-typography';
import { colors } from '@/theme/colors';
import {
  Controller,
  type Path,
  type Control,
  type FieldError,
  type RegisterOptions,
  type FieldValues,
} from 'react-hook-form';

// Option type for select fields
export type Option = { value: string; label: string };

export interface FormFieldProps<T extends FieldValues>
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'name' | 'control' | 'label' | 'size'> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  type?: 'text' | 'select' | 'textarea' | 'email';
  options?: Array<Option>;
  rules?: RegisterOptions<T>;
  size?: 'small' | 'large' | 'fullWidth';
  isMobile?: boolean;
  setPlaceholder?: boolean;
}

const FormField = <T extends FieldValues>({
  name,
  control,
  label,
  type = 'text',
  options = [],
  rules,
  size = 'fullWidth',
  isMobile = false,
  setPlaceholder = true,
  ...rest
}: FormFieldProps<T>) => {
  const sizeClass = '';
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => {
        const error: FieldError | undefined = fieldState.error;
        const baseClass =
          'rounded-[10px] px-3 py-2 ' +
          (error ? ' border-red-500' : colors.white) +
          ' ' +
          sizeClass +
          ' h-[40px] bg-white';

        return (
          <div className="flex flex-col">
            <label htmlFor={field.name} className="mb-1 block font-medium">
              <CustomTypography type={isMobile ? 'textSecondaryOne' : 'textSecondaryOne'} color="secondary">
                {label}
              </CustomTypography>
            </label>
            {type === 'textarea' ? (
              <textarea
                value={field.value}
                id={field.name}
                ref={field.ref as any}
                onChange={field.onChange as any}
                onBlur={field.onBlur as any}
                className={baseClass + ' resize-none'}
                style={{
                  borderStyle: 'solid',
                  borderColor: error ? 'red' : colors.darkGrey,
                  borderWidth: '0.5px',
                  minHeight: '80px',
                  maxHeight: '200px',
                  fontSize: isMobile ? '12px' : '14px',
                }}
                placeholder={setPlaceholder ? label : ''}
              />
            ) : (
              <input
                {...field}
                id={field.name}
                className={baseClass}
                style={{
                  borderStyle: 'solid',
                  borderColor: error ? 'red' : colors.darkGrey,
                  borderWidth: '0.5px',
                  fontSize: isMobile ? '12px' : '14px',
                }}
                placeholder={setPlaceholder ? label : ''}
                type={type === 'email' ? 'email' : 'text'}
                {...rest}
              />
            )}
            {error && <div className="mt-1 text-xs text-red-500">{error.message}</div>}
          </div>
        );
      }}
    />
  );
};

export default FormField;
