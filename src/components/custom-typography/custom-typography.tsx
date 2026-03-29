import { forwardRef, memo, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { tss } from 'tss-react';

import { useHover } from '@/hooks/use-hover';

import type { EllipsisOptions, CustomTypographyProps } from './custom-typography-types';

import { CustomTooltip } from '@/components/custom-tooltip';
import { CUSTOM_TYPOGRAPHY_STYLES } from './custom-typography-constants';
import { twMerge } from 'tailwind-merge';

const useStyles = tss.create({
  ...CUSTOM_TYPOGRAPHY_STYLES,
  container: {
    minWidth: 0,
  },
  typography: {
    WebkitBoxOrient: 'vertical',
    display: '-webkit-box',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    width: '100%',
    wordBreak: 'break-all',
  },
});

const BaseCustomTypography = forwardRef<HTMLSpanElement, CustomTypographyProps>(function BaseCustomTypography(
  { className, 'data-testid': dataTestId, display, style = {}, type, ...rest },
  ref
) {
  const { classes } = useStyles();

  return (
    <span
      {...rest}
      className={twMerge(classes[type], className)}
      data-testid={`pixi-typography-[${dataTestId || type}]`}
      ref={ref}
      style={{
        display,
        ...style,
      }}
    />
  );
});

const Ellipsis = memo(
  forwardRef<HTMLSpanElement, CustomTypographyProps>(({ children, className, ellipsis, style = {}, ...rest }, ref) => {
    const { classes, cx } = useStyles();
    const [text, setText] = useState('');
    const containerElementRef = useRef<HTMLDivElement>(null);
    const typographyRef = useRef<HTMLSpanElement>(null);

    const { isHovered } = useHover({ target: containerElementRef });

    const {
      containerClassName,
      isCalculatedTooltip = true,
      isCalculatedTooltipDefenitelyClosed,
      maxLines = 1,
      withTooltip = true,
    } = ellipsis && typeof ellipsis === 'object' ? ellipsis : ({} as EllipsisOptions);

    useImperativeHandle<HTMLSpanElement | null, HTMLSpanElement | null>(ref, () => typographyRef.current);

    useEffect(() => {
      // `children` must be tracked by `useEffect`, and if the following line would be omitted,
      // ESLint would warn that the unnecessary `children` dependency exists in the dependencies array.
      void children;

      if (typographyRef.current) {
        setText(typographyRef.current.innerText);
      }
    }, [children]);

    const tooltipTitle = typeof children === 'string' ? children : text;

    const typography = (
      <BaseCustomTypography
        {...rest}
        className={cx(classes.typography, className)}
        ref={typographyRef}
        style={{
          WebkitLineClamp: maxLines,
          ...style,
        }}
      >
        {children}
      </BaseCustomTypography>
    );

    return (
      <div className={cx(classes.container, containerClassName)} ref={containerElementRef}>
        {withTooltip && isHovered ? (
          <CustomTooltip
            maxLines={maxLines}
            title={tooltipTitle}
            {...(isCalculatedTooltip
              ? {
                  calculatedTooltipProps: {
                    definitelyClosed: isCalculatedTooltipDefenitelyClosed,
                    useHoverProps: {
                      target: typographyRef,
                    },
                    useIsContentTooWideForContainerProps: {
                      containerElement: containerElementRef,
                      elementForStyles: typographyRef,
                    },
                  },
                }
              : {})}
          >
            {typography}
          </CustomTooltip>
        ) : (
          typography
        )}
      </div>
    );
  })
);

export const CustomTypography = forwardRef<HTMLSpanElement, CustomTypographyProps>(function CustomTypography(
  { ellipsis, ...rest },
  ref
) {
  return ellipsis ? <Ellipsis {...rest} ellipsis={ellipsis} ref={ref} /> : <BaseCustomTypography {...rest} ref={ref} />;
});
