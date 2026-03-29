import type { DialogProps } from '@mui/material';
import type { CSSProperties, ReactNode } from 'react';

/**
 * Types of dialog boxes available.
 */
export enum dialogBoxTypes {
  INFO = 'info',
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error',
  CONFIRMATION = 'confirmation',
}

/**
 * Props for the DialogBox component.
 */
export interface DialogBoxProps extends Omit<DialogProps, 'onClose' | 'title'> {
  /** Custom header content. If not provided, it falls back to the title and close button. */
  header?: ReactNode;
  /** Custom footer content. If not provided, it falls back to the primary action button. */
  footer?: ReactNode;
  /** Title of the dialog (if `header` is not provided). */
  title?: ReactNode;
  /** Callback when the dialog closes. */
  onClose?: () => void;
  /** Primary action callback when the main button is clicked. */
  primaryAction?: () => void;
  /** Text displayed on the primary action button. */
  primaryActionText?: string;
  /** Styles for the title container of the dialog. */
  titleContainerStyles?: CSSProperties;
  /** Styles for the container of the dialog. */
  containerStyles?: CSSProperties;
  /** Styles for the content of the dialog. */
  contentContainerStyles?: CSSProperties;
  /** Callback when the cancel button is clicked. */
  cancelAction?: () => void;
}
