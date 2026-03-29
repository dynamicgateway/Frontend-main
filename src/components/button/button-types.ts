import type { ButtonBaseProps } from '@mui/material';
import type { Except, ValueOf } from 'type-fest';
import type { BUTTON_TYPE } from './button-constants';
import type { SvgrComponent } from '@/types/general-types';

export type ButtonTypes = typeof BUTTON_TYPE;
export type ButtonType = ValueOf<ButtonTypes>;

/**
 * Props for the reusable Button component.
 */
export interface ButtonProps extends Except<ButtonBaseProps, 'type'> {
  /**
   * The button's variant, which determines its styling.
   * @default "primary"
   */
  type: ButtonType;
  /** Icon appearing at the button's end. Should be a React component (e.g., an SVG component). */
  endIcon?: SvgrComponent;
  /** Icon appearing at the button's start. Should be a React component (e.g., an SVG component). */
  startIcon?: SvgrComponent;
  /** Additional className applied to the button's typography. */
  typographyClassName?: string;
  /** Additional className applied to the button's container. */
  containerClassName?: string;
  tooltipTitle?: string;
}
