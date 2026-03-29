import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';
import type { Simplify, ValueOf } from 'type-fest';

import type { CUSTOM_TYPOGRAPHY_STYLES, CUSTOM_TYPOGRAPHY_TYPES } from './custom-typography-constants';

export type CustomTypographyType = ValueOf<typeof CUSTOM_TYPOGRAPHY_TYPES>;

export type CustomTypographyStyles = typeof CUSTOM_TYPOGRAPHY_STYLES;
export type CustomTypographyStyle = CustomTypographyStyles[CustomTypographyType];

export interface EllipsisOptions {
  containerClassName?: string;
  isCalculatedTooltip?: boolean;
  isCalculatedTooltipDefenitelyClosed?: boolean;
  maxLines?: number;
  withTooltip?: boolean;
}

export type CustomTypographyProps = Simplify<
  {
    children: ReactNode;
    'data-testid'?: string;
    ellipsis?: EllipsisOptions | boolean | null | undefined;
    type: CustomTypographyType;
  } & HTMLAttributes<HTMLSpanElement> &
    Pick<CSSProperties, 'display'>
>;
