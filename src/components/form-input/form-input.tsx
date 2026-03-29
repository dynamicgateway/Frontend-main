import type { FormInputProps } from '@/components/form-input/form-input-types';
import { CUSTOM_TYPOGRAPHY_STYLES, CustomTypography } from '@/components/custom-typography';
import { type FC, useEffect, useState } from 'react';
import { twJoin, twMerge } from 'tailwind-merge';
import { useTranslation } from 'react-i18next';

export const FormInput: FC<FormInputProps> = ({
  className = '',
  containerClassName = '',
  label: labelProp,
  placeholder: placeholderProp,
  register,
  error,
  secured = false,
  readOnly = false,
  ...rest
}) => {
  const { t } = useTranslation();

  const label = labelProp || t('placeholders.title');
  const placeholder = placeholderProp || t('placeholders.enter_here');

  const [isSecured, setIsSecured] = useState(secured);

  const toggleSecured = () => setIsSecured((prev) => !prev);

  useEffect(() => {
    if (readOnly) setIsSecured(false);
  }, [readOnly]);

  return (
    <div className={twMerge('mx-0 my-0 flex flex-col gap-1', containerClassName)}>
      {label && (
        <CustomTypography
          type={readOnly ? 'textSecondaryOne' : 'textSecondaryOne'}
          className={twJoin(readOnly && 'text-gray-100')}
        >
          {label}
          {!readOnly && (rest.required || register?.required) ? <span className="text-red-100"> *</span> : ''}
        </CustomTypography>
      )}

      <div className="relative">
        <input
          {...rest}
          type={isSecured ? 'password' : rest.type || 'text'}
          className={twMerge(
            'h-[46px] w-full rounded-xl border border-gray-100 bg-white px-5 text-blue-100 outline-none',
            readOnly && 'h-fit border-none bg-transparent px-0',
            className
          )}
          style={{ ...CUSTOM_TYPOGRAPHY_STYLES.textSecondaryOne }}
          placeholder={readOnly ? undefined : placeholder}
          readOnly={readOnly}
          {...(register ? register : {})}
        />

        {!readOnly && secured && (
          <button
            type="button"
            onClick={toggleSecured}
            className="text-color_one-80 absolute top-1/2 right-4 -translate-y-1/2"
            aria-label={isSecured ? 'Show password' : 'Hide password'}
          >
            {/* {isSecured ? <BlueNoViewIcon /> : <ViewIcon />} */}
          </button>
        )}
      </div>

      {!readOnly && error?.message && (
        <CustomTypography type="textSecondaryOne" className="text-red-600">
          {error.message}
        </CustomTypography>
      )}
    </div>
  );
};
