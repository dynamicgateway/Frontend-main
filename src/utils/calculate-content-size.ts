/**
 * Removes function properties from an object and handles conditional type picking
 */
import type { ConditionalPick, Except } from 'type-fest';

import type { RemoveFunctionsFromObject } from '@/types/general-types';

import { TEMPORARY_ELEMENTS_CONTAINER_ID } from '@/constants/general-constants';
import { fontFamilies } from '@/theme/typography';

/**
 * Represents a sanitized version of CSSStyleDeclaration where all function properties are removed
 * and only string properties are kept, excluding numeric indices
 */
export type SanitizedCSSStyleDeclaration = RemoveFunctionsFromObject<
  Except<ConditionalPick<CSSStyleDeclaration, string>, number>
>;

/**
 * Props for calculating content size with optional CSS styles
 */
export interface CalculateContentSizeProps {
  /** Optional CSS styles to use for size calculation */
  stylesToCalculateBy?: Partial<SanitizedCSSStyleDeclaration>;
}

/**
 * Props for calculating content size based on an existing element
 * @template ContentType - Type of the content string
 * @template ElementType - Type of the DOM element
 */
export interface CalculateContentSizeByElementProps<ContentType extends string, ElementType extends Element> {
  /** Content to calculate size for */
  content: ContentType;
  /** Target element to base calculations on */
  element: ElementType | null | undefined;
}

/**
 * Result of content size calculation
 */
export interface CalculateContentSizeResult {
  /** Height of the content in pixels */
  height: number;
  /** Width of the content in pixels */
  width: number;
}

/**
 * Attaches a shadow root to an element or returns existing shadow root
 * @param element - The element to attach shadow root to
 * @param options - Shadow root initialization options
 * @returns The shadow root instance
 */
export const attachShadowToElement = (element: Element, { mode = 'open', ...rest }: Partial<ShadowRootInit> = {}) =>
  element.shadowRoot ?? element.attachShadow({ mode, ...rest });

/**
 * Calculates the size of content with specified styles
 * @param content - The content to calculate size for
 * @param options - Configuration options for size calculation
 * @returns Object containing calculated height and width
 */
export const calculateContentSize = (
  content: string,
  {
    stylesToCalculateBy: {
      fontFamily = fontFamilies.roboto,
      fontSize = '16px',
      fontWeight = 'normal',
      lineHeight = 'normal',
      wordBreak = 'normal',
      ...restOfStyles
    } = {},
  }: CalculateContentSizeProps = {}
): CalculateContentSizeResult => {
  const element = document.createElement('div');

  element.innerHTML = content;

  Object.assign(element.style, {
    ...restOfStyles,
    fontFamily,
    fontSize,
    fontWeight,
    height: 'auto',
    left: '-999px',
    lineHeight,
    overflowX: 'visible',
    position: 'absolute',
    top: '-999px',
    visibility: 'hidden',
    width: 'fit-content',
    wordBreak,
  });

  const shadowHost = document.createElement('div');
  const shadowRoot = attachShadowToElement(shadowHost);

  shadowRoot.appendChild(element);

  const temporaryElementsContainer = document.getElementById(TEMPORARY_ELEMENTS_CONTAINER_ID);

  if (temporaryElementsContainer) {
    temporaryElementsContainer.appendChild(shadowHost);
  } else {
    document.body.appendChild(shadowHost);
  }

  const { height, width } = element.getBoundingClientRect();

  shadowHost.parentNode?.removeChild(shadowHost);

  return { height, width };
};

/**
 * Sanitizes a CSSStyleDeclaration object by removing non-string properties and numeric indices
 * @param cssStyleDeclaration - The CSS style declaration to sanitize
 * @returns A sanitized version of the CSS style declaration
 */
export const sanitizeCssStyleDeclaration = (cssStyleDeclaration: CSSStyleDeclaration) => {
  const sanitizedCssStyleDeclaration = {} as SanitizedCSSStyleDeclaration;

  const allKeys = Object.keys(cssStyleDeclaration) as Array<keyof CSSStyleDeclaration>;

  allKeys.forEach((key) => {
    if (typeof key === 'string' && !Number(key) && key.trim() !== '0' && typeof cssStyleDeclaration[key] === 'string') {
      const sanitizedKey = key as keyof SanitizedCSSStyleDeclaration;
      sanitizedCssStyleDeclaration[sanitizedKey] = cssStyleDeclaration[sanitizedKey];
    }
  });

  return sanitizedCssStyleDeclaration;
};

/**
 * Calculates content size based on an existing element's computed styles
 * @template ContentType - Type of the content string
 * @template ElementType - Type of the DOM element
 * @param props - Props containing content and target element
 * @returns Object containing calculated height and width
 */
export const calculateContentSizeByElement = <ContentType extends string, ElementType extends Element>({
  content,
  element,
}: CalculateContentSizeByElementProps<ContentType, ElementType>) => {
  const stylesToCalculateBy = {} as SanitizedCSSStyleDeclaration;

  if (element) {
    const sanitizedComputedStyles = sanitizeCssStyleDeclaration(getComputedStyle(element));

    Object.assign(stylesToCalculateBy, sanitizedComputedStyles);
  }

  return calculateContentSize(content, { stylesToCalculateBy });
};
