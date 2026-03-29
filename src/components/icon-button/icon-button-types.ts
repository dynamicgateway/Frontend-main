import type { ButtonBaseProps } from '@mui/material';
import type { Except, ValueOf } from 'type-fest';
import type { BUTTON_TYPE } from '@/components/button/button-constants';
import type { SvgrComponent } from '@/types/general-types';

export type ButtonTypes = typeof BUTTON_TYPE;
export type ButtonType = ValueOf<ButtonTypes>;

/**
 * Props for the reusable IconButton component.
 */
export interface IconButtonProps extends Except<ButtonBaseProps, 'type'> {
  /**
   * The button's variant, which determines its styling.
   * @default "primary"
   */
  type?: ButtonType;
  /** The icon to display inside the button. Should be a React component (e.g., an SVG component). */
  icon: SvgrComponent;
}
