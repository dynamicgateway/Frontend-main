import type { useHover, UseHoverProps } from '@/hooks/use-hover';
import type { UseIsContentTooWideForContainerProps } from '@/hooks/use-is-content-too-wide-for-container';
import type { TooltipProps } from '@mui/material';
import type { CSSProperties, MutableRefObject, PropsWithoutRef } from 'react';
import type { Except, Simplify } from 'type-fest';

export type OriginalOffsets = Pick<CSSProperties, 'bottom' | 'left' | 'right' | 'top'>;

export type Offsets = Partial<Record<keyof OriginalOffsets, string>>;

export type CustomRegularTooltipProps = PropsWithoutRef<TooltipProps>;

export type CalculatedTooltipInternalsRef = Simplify<
  MutableRefObject<{ isContentTooWide?: boolean } & Partial<ReturnType<typeof useHover>>>
>;

export type CustomCalculatedTooltipProps = Simplify<
  {
    calculatedTooltipProps: {
      calculatedTooltipInternalsRef?: CalculatedTooltipInternalsRef;
      definitelyClosed?: boolean;
      definitelyOpen?: boolean;
      useHoverProps: UseHoverProps;
      useIsContentTooWideForContainerProps: Except<UseIsContentTooWideForContainerProps, 'content'>;
    };
    maxLines?: number;
    title: string;
  } & Except<
    CustomRegularTooltipProps,
    'disableFocusListener' | 'disableHoverListener' | 'disableTouchListener' | 'onClose' | 'onOpen' | 'open' | 'title'
  >
>;

export type CustomTooltipProps = Simplify<
  {
    offsets?: Offsets;
  } & {
    title: NonNullable<React.ReactNode> | UseIsContentTooWideForContainerProps['content'];
  } & { supportingText?: string } & (CustomCalculatedTooltipProps | CustomRegularTooltipProps)
>;
