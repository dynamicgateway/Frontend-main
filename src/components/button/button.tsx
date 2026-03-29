import { ButtonBase } from '@mui/material';
import type { FC } from 'react';
import { twMerge } from 'tailwind-merge';
import type { ButtonProps } from './button-types';
import { BUTTON_TYPE } from './button-constants';
import { CustomTypography } from '@/components/custom-typography';
import { useSelector } from 'react-redux';
import { selectIsMobile } from '@/store/slices/system';
import { CustomTooltip } from '@/components/custom-tooltip';
import { colors } from '@/theme/colors';

/**
 * A reusable button component that supports icons and responsive typography.
 *
 * @param {ButtonProps} props - Props for configuring the button.
 * @returns {JSX.Element} The rendered button component.
 */
export const Button: FC<ButtonProps> = ({
  children,
  containerClassName,
  className,
  type = BUTTON_TYPE.filled,
  endIcon: EndIcon,
  startIcon: StartIcon,
  typographyClassName,
  tooltipTitle = '',
  ...rest
}) => {
  const isMobile = useSelector(selectIsMobile);

  return (
    <CustomTooltip title={tooltipTitle} disableHoverListener={!tooltipTitle} placement="top">
      {/** @description span is added since disabled button won't trigger tooltip. */}
      <span className={containerClassName}>
        <ButtonBase
          {...rest}
          className={className}
          sx={{
            '&.MuiButtonBase-root': {
              height: '46px',
              padding: '0px 20px',
              gap: '8px',
              borderRadius: '6px',
              border: 'none',
              color: type === BUTTON_TYPE.filled ? 'white' : colors.primaryBlue,
              backgroundColor: type === BUTTON_TYPE.filled ? colors.primaryBlue : 'transparent',
              lineHeight: 'normal',
              textWrap: 'nowrap',
              transition: 'colors 200ms ease-linear',
            },
            '&:disabled': {
              opacity: 0.8,
            },
          }}
        >
          {StartIcon && (
            <div className="flex-shrink-0">
              <StartIcon className="h-6 w-6" />
            </div>
          )}

          <CustomTypography
            type={isMobile ? 'textSecondaryTwo' : 'button'}
            className={twMerge(type !== BUTTON_TYPE.text && 'text-white', typographyClassName)}
          >
            {children}
          </CustomTypography>

          {EndIcon && (
            <div className="flex-shrink-0">
              <EndIcon className="h-6 w-6" />
            </div>
          )}
        </ButtonBase>
      </span>
    </CustomTooltip>
  );
};

export default Button;
