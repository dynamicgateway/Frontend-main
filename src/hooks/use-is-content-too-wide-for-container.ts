import { type MutableRefObject, useEffect, useRef, useState } from 'react';

import { calculateContentSizeByElement } from '@/utils/calculate-content-size';

import type { RefOrFunction } from '@/types/general-types';

const resetCurrentTimeout = (currentTimeoutRef: MutableRefObject<number | undefined>) => {
  if (typeof currentTimeoutRef.current === 'number') {
    window.clearTimeout(currentTimeoutRef.current);
    currentTimeoutRef.current = undefined;
  }
};

export interface UseIsContentTooWideForContainerProps {
  /** The element that is checked, whether it's wide enough to contain the content. */
  containerElement: RefOrFunction<HTMLElement>;

  /** The content that should be checked whether it's too wide for its container element. */
  content: (() => string) | string;

  /**
   * An optional delay in milliseconds. If given a value, the calculations inside the hook
   * will be delayed until the given number of milliseconds is over.
   */
  delay?: number;

  /**
   * The element that displays the content text, and which computed styles are the baseline
   * for receiving the most accurate width of the content.
   */
  elementForStyles: RefOrFunction<Element>;

  /** The maximum number of rows before displaying an ellipsis. @default 1 */
  rowsAmount?: number;
}

/**
 * "useIsContentTooWideForContainer" is a React custom hook that uses the {@link calculateContentSizeByElement}
 * util under the hood, and taylors it specifically for use with React components.
 * @param useIsContentTooWideForContainerProps Props passed to `useIsContentTooWideForContainer`.
 * @returns Whether the given content is too wide for container element.
 */
export const useIsContentTooWideForContainer = ({
  containerElement,
  content,
  delay,
  elementForStyles,
  rowsAmount = 1,
}: UseIsContentTooWideForContainerProps) => {
  const [isContentTooWide, setIsContentTooWide] = useState(false);
  const extractedContainerElementRef = useRef<HTMLElement | null | undefined>(null);
  const extractedElementForStylesRef = useRef<Element | null | undefined>(null);
  const currentTimeoutRef = useRef<number>(undefined);

  const contentString = typeof content === 'function' ? content() : content;

  useEffect(() => {
    extractedContainerElementRef.current =
      typeof containerElement === 'function' ? containerElement() : containerElement.current;

    extractedElementForStylesRef.current =
      typeof elementForStyles === 'function' ? elementForStyles() : elementForStyles.current;

    const calculateAndSetIsTextTooLong = () => {
      if (extractedContainerElementRef.current && extractedElementForStylesRef.current) {
        resetCurrentTimeout(currentTimeoutRef);

        const { width: contentWidth } = calculateContentSizeByElement({
          content: contentString,
          element: extractedElementForStylesRef.current,
        });

        const containerElementWidth = extractedContainerElementRef.current.getBoundingClientRect().width;

        const { clientHeight, scrollHeight } = extractedElementForStylesRef.current;

        setIsContentTooWide(rowsAmount > 1 ? scrollHeight > clientHeight : contentWidth > containerElementWidth);
      } else {
        setIsContentTooWide(false);
      }
    };

    if (typeof delay === 'number') {
      currentTimeoutRef.current = window.setTimeout(calculateAndSetIsTextTooLong, delay);
    } else {
      calculateAndSetIsTextTooLong();
    }

    return () => {
      resetCurrentTimeout(currentTimeoutRef);
    };
  });

  return isContentTooWide;
};
