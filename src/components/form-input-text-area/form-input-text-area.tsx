import type { FC } from 'react';
import { CustomTypography } from '@/components/custom-typography';
import { twMerge } from 'tailwind-merge';
import type { FormInputTextAreaProps } from '@/components/form-input-text-area/form-input-text-area-types';
import { useTranslation } from 'react-i18next';

/**
 * A reusable text area input component with label, error handling, and read-only support.
 */
export const FormInputTextArea: FC<FormInputTextAreaProps> = ({
  containerClassName = '',
  className = '',
  label: labelProp,
  placeholder: placeholderProp,
  register,
  error,
  readOnly = false,
  ...rest
}) => {
  const { t } = useTranslation();

  const label = labelProp || t('placeholders.title');
  const placeholder = placeholderProp || t('placeholders.enter_here');

  return (
    <div className={twMerge('mx-0 my-0 flex flex-col gap-1', containerClassName)}>
      {label && (
        <CustomTypography
          type={readOnly ? 'textSecondaryOne' : 'textSecondaryOne'}
          className={twMerge(readOnly && 'text-color_one-80')}
        >
          {label}
          {!readOnly && (rest.required || register?.required) ? <span className="text-color_four-100"> *</span> : ''}
        </CustomTypography>
      )}

      <textarea
        {...rest}
        className={twMerge(
          'border-color_one-20 bg-color_two-100 min-h-[100px] w-full resize-none rounded-xl border px-5 py-2 text-white outline-none',
          readOnly && 'min-h-5 resize-none border-none bg-transparent px-0 py-0 text-white',
          className
        )}
        placeholder={readOnly ? undefined : placeholder}
        readOnly={readOnly}
        {...(register ? register : {})}
      />

      {!readOnly && error?.message && (
        <CustomTypography type="textSecondaryOne" className="text-red-600">
          {error.message}
        </CustomTypography>
      )}
    </div>
  );
};
