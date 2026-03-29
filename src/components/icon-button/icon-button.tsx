import { ButtonBase } from '@mui/material';
import type { FC } from 'react';
import type { IconButtonProps } from './icon-button-types';
import { BUTTON_TYPE } from '@/components/button/button-constants';
import { colors } from '@/theme/colors';

/**
 * A reusable button component for icons, styled similarly to the Button component.
 *
 * @param {IconButtonProps} props - Props for configuring the IconButton.
 * @returns {JSX.Element} The rendered `IconButton` component.
 */
export const IconButton: FC<IconButtonProps> = ({ className, type = 'filled', icon: Icon, ...rest }) => (
  <ButtonBase
    {...rest}
    className={className}
    sx={{
      '&.MuiButtonBase-root': {
        height: '24px',
        width: '24px',
        padding: '0px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '6px',
        border: 'none',
        color: type === BUTTON_TYPE.filled ? 'white' : colors.primaryBlue,
        backgroundColor: type === BUTTON_TYPE.filled ? colors.primaryBlue : 'transparent',
      },
      '&:disabled': {
        opacity: 0.8,
      },
    }}
  >
    {Icon && <Icon className="h-6 w-6 flex-shrink-0" />}
  </ButtonBase>
);

export default IconButton;
