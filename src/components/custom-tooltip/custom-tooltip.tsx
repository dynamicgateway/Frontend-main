import { Tooltip } from '@mui/material';
import { type FC, useEffect } from 'react';
import { tss } from 'tss-react';
import type { CustomCalculatedTooltipProps, CustomTooltipProps, Offsets } from './custom-tooltip-types';
import { colors } from '@/theme/colors';
import { useIsContentTooWideForContainer } from '@/hooks/use-is-content-too-wide-for-container';
import { useHover } from '@/hooks/use-hover';
import { ZIndexLevelsEnum } from '@/constants/ui-constants';
import { CustomTypography } from '@/components/custom-typography';

const createPopperOffsets = ({ offsets }: { offsets: Offsets }) => {
  const offsetEntries = Object.entries(offsets) as Array<[keyof Offsets, string]>;

  const popperOffsets: Offsets = {};

  offsetEntries.forEach(([offsetKey, offsetValue]) => {
    if (offsetValue.trim()) {
      popperOffsets[offsetKey] = `${offsetValue} !important`;
    }
  });

  return popperOffsets;
};

const useStyles = tss
  .withParams<{
    isLeft?: boolean;
    isRight?: boolean;
    left?: string;
    offsets: Offsets;
    right?: string;
  }>()
  .create(({ isLeft, isRight, left, offsets, right }) => ({
    arrow: {
      '&:before': {
        borderRadius: '2px',
        zIndex: ZIndexLevelsEnum.CUSTOM_TOOLTIP,
      },
      zIndex: ZIndexLevelsEnum.CUSTOM_TOOLTIP,
      color: colors.lightGrey,
      height: isLeft || isRight ? '16px !important' : '12px !important',
      width: isLeft || isRight ? '12px !important' : '16px !important',
      ...(right || left
        ? {
            left: left ? `${left} !important` : 'unset !important',
            right: right ? `${right} !important` : 'unset !important',
          }
        : {}),
    },
    bigTooltip: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      zIndex: ZIndexLevelsEnum.CUSTOM_TOOLTIP,
    },
    popper: {
      zIndex: ZIndexLevelsEnum.CUSTOM_TOOLTIP,
      ...createPopperOffsets({ offsets }),
    },
  }));

/**
 * `PixiCalculatedTooltip` is a calculated version of the MUI "Tooltip" component,
 * disabling the defaults that determine wheter to show the tooltip,
 * and conditioning it to show only if the provided title is too wide for its container element,
 * unless "definitelyOpen" or "definitelyClosed" are given "true" - then the default check is overridden.
 * @param pixiCalculatedTooltipProps Props of the `PixiCalculatedTooltip` component
 * @returns A calculated version of Mui's `Tooltip` component
 */
const CustomCalculatedTooltip: FC<CustomCalculatedTooltipProps> = ({
  calculatedTooltipProps: {
    calculatedTooltipInternalsRef,
    definitelyClosed = false,
    definitelyOpen = false,
    useHoverProps,
    useIsContentTooWideForContainerProps,
  },
  maxLines,
  title,
  ...rest
}) => {
  const isContentTooWide = useIsContentTooWideForContainer({
    content: title,
    rowsAmount: maxLines,
    ...useIsContentTooWideForContainerProps,
  });

  const { isHovered, ...useHoverRest } = useHover({ ...useHoverProps });

  if (calculatedTooltipInternalsRef) {
    Object.assign(calculatedTooltipInternalsRef.current, {
      isContentTooWide,
      isHovered,
      ...useHoverRest,
    });
  }

  useEffect(
    () => () => {
      if (calculatedTooltipInternalsRef) {
        calculatedTooltipInternalsRef.current = {};
      }
    },
    [calculatedTooltipInternalsRef]
  );

  return (
    <Tooltip
      {...rest}
      disableFocusListener
      disableHoverListener
      disableTouchListener
      open={!definitelyClosed && (definitelyOpen || (isHovered && isContentTooWide))}
      title={title}
    />
  );
};

export const CustomTooltip: FC<CustomTooltipProps> = ({
  arrow,
  classes: { popper: popperClassName, ...muiTooltipClasses } = {},
  offsets = {},
  placement,
  supportingText,
  title,
  ...rest
}) => {
  const leftPosition = arrow && placement?.includes('start') ? '8px' : undefined;
  const rightPosition = arrow && placement?.includes('end') ? '8px' : undefined;
  const isLeft = arrow && placement?.includes('left');
  const isRight = arrow && placement?.includes('right');
  const { classes, cx } = useStyles({
    isLeft,
    isRight,
    left: leftPosition,
    offsets,
    right: rightPosition,
  });

  const currentTitle = typeof title === 'function' ? title() : title;
  const tolltipTitle = supportingText ? (
    <div className={classes.bigTooltip}>
      <CustomTypography type="textSecondaryOne">{title}</CustomTypography>
      <CustomTypography type="textSecondaryOne">{supportingText}</CustomTypography>
    </div>
  ) : (
    currentTitle
  );

  const muiClasses: CustomTooltipProps['classes'] = {
    ...muiTooltipClasses,
    arrow: classes.arrow,
    popper: cx(classes.popper, popperClassName),
  };

  return 'calculatedTooltipProps' in rest && typeof tolltipTitle === 'string' ? (
    <CustomCalculatedTooltip {...rest} arrow={arrow} classes={muiClasses} placement={placement} title={tolltipTitle} />
  ) : (
    <Tooltip {...rest} arrow={arrow} classes={muiClasses} placement={placement} title={tolltipTitle} />
  );
};
