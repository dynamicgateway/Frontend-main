import { useEffect, type HTMLAttributes } from 'react';

import { useBooleanState } from '@/hooks/use-boolean-state';

import type { RefOrFunction } from '@/types/general-types';

export interface UseHoverProps<TargetElement extends Element = Element> {
  /** The default hover state. @default false */
  defaultState?: boolean | undefined;

  /** The target element of which its hover state is tracked. */
  target?: RefOrFunction<TargetElement> | undefined;
}

export type UseHoverEventListeners<TargetElement extends Element = Element> = Pick<
  HTMLAttributes<TargetElement>,
  'onMouseEnter' | 'onMouseLeave'
>;

/**
 * "useHover" is a React custom hook that tracks the hover state of a target element.
 * @param useHoverProps Props passed to `useHover`.
 * @returns A tuple that includes the hover state, and an object that contains relevant event-listeners for a React HTML element,
 * which can conveniently be used instead of providing a target element through the "target" prop.
 */
export const useHover = <TargetElement extends Element = Element>({
  defaultState = false,
  target,
}: UseHoverProps<TargetElement> = {}) => {
  const [isHovered, isHoveredSetters] = useBooleanState(defaultState);

  const { toFalse, toTrue } = isHoveredSetters;

  useEffect(() => {
    const element = typeof target === 'function' ? target() : target?.current;

    if (element?.addEventListener) {
      element.addEventListener('mouseenter', toTrue);
      element.addEventListener('mouseleave', toFalse);

      return () => {
        element.removeEventListener('mouseenter', toTrue);
        element.removeEventListener('mouseleave', toFalse);
      };
    }

    return;
  });

  return {
    hoverEventListeners: {
      onMouseEnter: toTrue,
      onMouseLeave: toFalse,
    } satisfies UseHoverEventListeners<TargetElement>,
    isHovered,
    isHoveredSetters,
  } as const;
};
