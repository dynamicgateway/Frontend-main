import { useState, type FC } from 'react';
import ReactSelect from 'react-select';
import { CustomTypography } from '@/components/custom-typography';
import { twJoin, twMerge } from 'tailwind-merge';
import type { FormSelectProps } from '@/components/form-select/form-select-types';
import { Controller, type ControllerRenderProps } from 'react-hook-form';
import { colors } from '@/theme/colors';
import type { SelectableOption } from '@/types/general-types';

/**
 * A reusable form-select component that integrates with React Hook Form.
 * Allows for autocomplete and custom styling with Tailwind classes.
 */
export const FormSelect: FC<FormSelectProps> = ({
  containerClassName,
  options,
  label,
  placeholder = 'Select...',
  control,
  name,
  error,
  isSearchable = true,
  readOnly = false,
  onChange,
  ...rest
}) => {
  const [inputValue, setInputValue] = useState<string>('');

  const handleInputChange = (value: string) => {
    setInputValue(value);
  };

  const renderSelect = (field?: ControllerRenderProps<any, string>) =>
    readOnly ? (
      <div className="h-fit w-full">
        <CustomTypography type="textSecondaryOne" className="text-white">
          {((options || []) as Array<SelectableOption>).find((option) => option.value === field?.value)?.label}
        </CustomTypography>
      </div>
    ) : (
      <ReactSelect
        {...(field || {})}
        options={options}
        classNames={{
          container: () => 'h-[46px] rounded-xl bg-color_two-100 text-white outline-none p-0 m-0',
          control: () =>
            twMerge(
              'border-color_one-20 bg-color_two-100 h-[46px] w-full rounded-xl border pl-2 text-white outline-none',
              'hover:border-color_one-20 focus:border-color_one-20 active:border-color_one-20'
            ),
          menu: () => 'bg-color_two-100 rounded-xl',
          option: ({ isFocused, isSelected }) =>
            twMerge(
              'cursor-pointer px-2 py-1',
              isFocused ? 'bg-color_five-80 text-white' : 'text-white',
              isSelected && 'bg-color_five-80'
            ),
          singleValue: () => 'text-white',
          input: () => 'text-white',
          placeholder: () => 'italic text-sm text-[#9ca3af]',
          indicatorSeparator: () => 'hidden',
        }}
        /**
         * Do not remove this styles property. It's a known ReactSelect bug that Input disappears on selection change, but before blur.
         * To reproduce the bug - comment out this property, select any option, but do not blur.
         */
        styles={{
          input: (provided) => ({
            ...provided,
            '& > input:first-of-type': {
              opacity: '1 !important',
            },
          }),
        }}
        // placeholder={placeholder}
        isSearchable={isSearchable}
        inputValue={inputValue}
        onInputChange={handleInputChange}
        onChange={(selected) => {
          handleInputChange(selected?.label ?? '');

          if (field) {
            field.onChange(selected?.value ?? '');
          } else {
            onChange?.(selected?.value ?? '');
          }
        }}
        value={((options || []) as Array<SelectableOption>).find((option) => option.value === field?.value)}
        {...rest}
      />
    );

  return (
    <div className={twMerge('flex flex-col gap-1', containerClassName)}>
      {label && (
        <CustomTypography type="textSecondaryOne" className={twJoin(readOnly && 'text-color_one-80')}>
          {label}
          {!readOnly && rest.required ? <span className="text-color_four-100"> *</span> : ''}
        </CustomTypography>
      )}

      {control ? (
        <Controller name={name} control={control} render={({ field }) => renderSelect(field)} />
      ) : (
        renderSelect()
      )}

      {error && (
        <CustomTypography type="textSecondaryOne" className="text-red-600" style={{ color: colors.error }}>
          {error.message}
        </CustomTypography>
      )}
    </div>
  );
};
