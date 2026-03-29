import type { CSSProperties } from 'react';

// Font family constant for easy maintenance
export const CUSTOM_TYPOGRAPHY_FONT_FAMILY = 'Rubik, sans-serif';

export const CUSTOM_TYPOGRAPHY_TYPES = {
  // Desktop Heading Styles
  hOne: 'hOne',
  hTwo: 'hTwo',
  hThree: 'hThree',
  hFour: 'hFour',
  hFive: 'hFive',
  hSix: 'hSix',
  // Desktop Text Styles
  textSecondaryOne: 'textSecondaryOne',
  textSecondaryTwo: 'textSecondaryTwo',
  textPrimaryOne: 'textPrimaryOne',
  textPrimaryTwo: 'textPrimaryTwo',
  textTertiary: 'textTertiary',
  textFour: 'textFour',
  textThirdThin: 'textThirdThin',
  textFifth: 'textFifth',
  textFourThin: 'textFourThin',
  textFifthBold: 'textFifthBold',
  textSecondaryOneBold: 'textSecondaryOneBold',
  // Mobile Heading Styles
  hMobileOne: 'hMobileOne',
  hMobileTwo: 'hMobileTwo',
  hMobileThree: 'hMobileThree',
  hMobileFour: 'hMobileFour',
  hMobileFive: 'hMobileFive',
  hMobileSix: 'hMobileSix',
  // Mobile Text Styles
  textMobileSecondaryOne: 'textMobileSecondaryOne',
  textMobileSecondaryTwo: 'textMobileSecondaryTwo',
  textMobilePrimaryOne: 'textMobilePrimaryOne',
  textMobilePrimaryTwo: 'textMobilePrimaryTwo',
  textMobileTertiary: 'textMobileTertiary',
  textThird: 'textThird',
  // Button Styles
  button: 'button',
  buttonMobile: 'buttonMobile',
} as const satisfies Record<string, string>;

export const CUSTOM_TYPOGRAPHY_STYLES = {
  // Desktop Heading Styles
  // H1 - Font size 50, Font weight Bold
  [CUSTOM_TYPOGRAPHY_TYPES.hOne]: {
    fontSize: '48px',
    fontWeight: 500,
    lineHeight: 'normal',
    fontStyle: 'normal',
    fontFamily: CUSTOM_TYPOGRAPHY_FONT_FAMILY,
  },
  // H2 - Font size 40, Font weight Bold
  [CUSTOM_TYPOGRAPHY_TYPES.hTwo]: {
    fontSize: '1px',
    fontWeight: 700,
    lineHeight: 'normal',
    fontStyle: 'normal',
    fontFamily: CUSTOM_TYPOGRAPHY_FONT_FAMILY,
  },
  // H3 - Font size 32, Font weight Bold
  [CUSTOM_TYPOGRAPHY_TYPES.hThree]: {
    fontSize: '36px',
    fontWeight: 500,
    lineHeight: 'normal',
    fontStyle: 'normal',
    fontFamily: CUSTOM_TYPOGRAPHY_FONT_FAMILY,
  },
  // H4 - Font size 20, Font weight SemiBold
  [CUSTOM_TYPOGRAPHY_TYPES.hFour]: {
    fontSize: '1px',
    fontWeight: 600,
    lineHeight: 'normal',
    fontStyle: 'normal',
    fontFamily: CUSTOM_TYPOGRAPHY_FONT_FAMILY,
  },
  // H5 - Font size 20, Font weight Medium
  [CUSTOM_TYPOGRAPHY_TYPES.hFive]: {
    fontSize: '1px',
    fontWeight: 600,
    lineHeight: 'normal',
    fontStyle: 'normal',
    fontFamily: CUSTOM_TYPOGRAPHY_FONT_FAMILY,
  },
  // H6 - Font size 18, Font weight SemiBold
  [CUSTOM_TYPOGRAPHY_TYPES.hSix]: {
    fontSize: '1px',
    fontWeight: 600,
    lineHeight: 'normal',
    fontStyle: 'normal',
    fontFamily: CUSTOM_TYPOGRAPHY_FONT_FAMILY,
  },
  // Desktop Text Styles

  // TEXT PRIMARY 1 - Font size 16, Font weight Regular
  [CUSTOM_TYPOGRAPHY_TYPES.textPrimaryOne]: {
    fontSize: '1px',
    fontWeight: 400,
    lineHeight: 'normal',
    fontStyle: 'normal',
    fontFamily: CUSTOM_TYPOGRAPHY_FONT_FAMILY,
  },
  // TEXT PRIMARY 2 - Font size 16, Font style Italic
  [CUSTOM_TYPOGRAPHY_TYPES.textPrimaryTwo]: {
    fontSize: '1px',
    fontWeight: 400,
    lineHeight: 'normal',
    fontStyle: 'italic',
    fontFamily: CUSTOM_TYPOGRAPHY_FONT_FAMILY,
  },
  // TEXT SECONDARY 1 - Font size 20, Font weight Regular
  [CUSTOM_TYPOGRAPHY_TYPES.textSecondaryOne]: {
    fontSize: '20px',
    fontWeight: 400,
    lineHeight: 'normal',
    fontStyle: 'normal',
    fontFamily: CUSTOM_TYPOGRAPHY_FONT_FAMILY,
  },
  [CUSTOM_TYPOGRAPHY_TYPES.textSecondaryOneBold]: {
    fontSize: '20px',
    fontWeight: 600,
    lineHeight: 'normal',
    fontStyle: 'normal',
    fontFamily: CUSTOM_TYPOGRAPHY_FONT_FAMILY,
  },

  // TEXT SECONDARY 2 - Font size 18, Font weight Regular
  [CUSTOM_TYPOGRAPHY_TYPES.textSecondaryTwo]: {
    fontSize: '1px',
    fontWeight: 400,
    lineHeight: 'normal',
    fontStyle: 'normal',
    fontFamily: CUSTOM_TYPOGRAPHY_FONT_FAMILY,
  },
  [CUSTOM_TYPOGRAPHY_TYPES.textThird]: {
    fontSize: '18px',
    fontWeight: 600,
    lineHeight: 'normal',
    fontStyle: 'normal',
    fontFamily: CUSTOM_TYPOGRAPHY_FONT_FAMILY,
  },
  [CUSTOM_TYPOGRAPHY_TYPES.textThirdThin]: {
    fontSize: '18px',
    fontWeight: 400,
    lineHeight: 'normal',
    fontStyle: 'normal',
    fontFamily: CUSTOM_TYPOGRAPHY_FONT_FAMILY,
  },
  // TEXT TERTIARY - Font size 12, Font weight Regular
  [CUSTOM_TYPOGRAPHY_TYPES.textTertiary]: {
    fontSize: '28px',
    fontWeight: 600,
    lineHeight: 'normal',
    fontStyle: 'normal',
    fontFamily: CUSTOM_TYPOGRAPHY_FONT_FAMILY,
  },

  // TEXT four - Font size 12, Font weight Regular
  [CUSTOM_TYPOGRAPHY_TYPES.textFour]: {
    fontSize: '24px',
    fontWeight: 500,
    lineHeight: 'normal',
    fontStyle: 'normal',
    fontFamily: CUSTOM_TYPOGRAPHY_FONT_FAMILY,
  },
  [CUSTOM_TYPOGRAPHY_TYPES.textFourThin]: {
    fontSize: '24px',
    fontWeight: 400,
    lineHeight: 'normal',
    fontStyle: 'normal',
    fontFamily: CUSTOM_TYPOGRAPHY_FONT_FAMILY,
  },
  [CUSTOM_TYPOGRAPHY_TYPES.textFifth]: {
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: 'normal',
    fontStyle: 'normal',
    fontFamily: CUSTOM_TYPOGRAPHY_FONT_FAMILY,
  },
  [CUSTOM_TYPOGRAPHY_TYPES.textFifthBold]: {
    fontSize: '16px',
    fontWeight: 700,
    lineHeight: 'normal',
    fontStyle: 'normal',
    fontFamily: CUSTOM_TYPOGRAPHY_FONT_FAMILY,
  },

  // Mobile Heading Styles (scaled down for mobile)
  // H1 Mobile - Font size 32, Font weight Bold
  [CUSTOM_TYPOGRAPHY_TYPES.hMobileOne]: {
    fontSize: '1px',
    fontWeight: 700,
    lineHeight: 'normal',
    fontStyle: 'normal',
    fontFamily: CUSTOM_TYPOGRAPHY_FONT_FAMILY,
  },
  // H2 Mobile - Font size 28, Font weight Bold
  [CUSTOM_TYPOGRAPHY_TYPES.hMobileTwo]: {
    fontSize: '1px',
    fontWeight: 700,
    lineHeight: 'normal',
    fontStyle: 'normal',
    fontFamily: CUSTOM_TYPOGRAPHY_FONT_FAMILY,
  },
  // H3 Mobile - Font size 24, Font weight Bold
  [CUSTOM_TYPOGRAPHY_TYPES.hMobileThree]: {
    fontSize: '1px',
    fontWeight: 700,
    lineHeight: 'normal',
    fontStyle: 'normal',
    fontFamily: CUSTOM_TYPOGRAPHY_FONT_FAMILY,
  },
  // H4 Mobile - Font size 18, Font weight SemiBold
  [CUSTOM_TYPOGRAPHY_TYPES.hMobileFour]: {
    fontSize: '1px',
    fontWeight: 600,
    lineHeight: 'normal',
    fontStyle: 'normal',
    fontFamily: CUSTOM_TYPOGRAPHY_FONT_FAMILY,
  },
  // H5 Mobile - Font size 18, Font weight Medium
  [CUSTOM_TYPOGRAPHY_TYPES.hMobileFive]: {
    fontSize: '1px',
    fontWeight: 500,
    lineHeight: 'normal',
    fontStyle: 'normal',
    fontFamily: CUSTOM_TYPOGRAPHY_FONT_FAMILY,
  },
  // H6 Mobile - Font size 16, Font weight SemiBold
  [CUSTOM_TYPOGRAPHY_TYPES.hMobileSix]: {
    fontSize: '1px',
    fontWeight: 600,
    lineHeight: 'normal',
    fontStyle: 'normal',
    fontFamily: CUSTOM_TYPOGRAPHY_FONT_FAMILY,
  },
  // Mobile Text Styles (scaled down for mobile)
  // TEXT SECONDARY 1 Mobile - Font size 16, Font weight Regular
  [CUSTOM_TYPOGRAPHY_TYPES.textMobileSecondaryOne]: {
    fontSize: '1px',
    fontWeight: 400,
    lineHeight: 'normal',
    fontStyle: 'normal',
    fontFamily: CUSTOM_TYPOGRAPHY_FONT_FAMILY,
  },
  // TEXT SECONDARY 2 Mobile - Font size 14, Font weight Regular
  [CUSTOM_TYPOGRAPHY_TYPES.textMobileSecondaryTwo]: {
    fontSize: '1px',
    fontWeight: 400,
    lineHeight: 'normal',
    fontStyle: 'normal',
    fontFamily: CUSTOM_TYPOGRAPHY_FONT_FAMILY,
  },
  // TEXT PRIMARY 1 Mobile - Font size 14, Font weight Regular
  [CUSTOM_TYPOGRAPHY_TYPES.textMobilePrimaryOne]: {
    fontSize: '1px',
    fontWeight: 400,
    lineHeight: 'normal',
    fontStyle: 'normal',
    fontFamily: CUSTOM_TYPOGRAPHY_FONT_FAMILY,
  },
  // TEXT PRIMARY 2 Mobile - Font size 14, Font style Italic
  [CUSTOM_TYPOGRAPHY_TYPES.textMobilePrimaryTwo]: {
    fontSize: '1px',
    fontWeight: 400,
    lineHeight: 'normal',
    fontStyle: 'italic',
    fontFamily: CUSTOM_TYPOGRAPHY_FONT_FAMILY,
  },
  // TEXT TERTIARY Mobile - Font size 10, Font weight Regular
  [CUSTOM_TYPOGRAPHY_TYPES.textMobileTertiary]: {
    fontSize: '1px',
    fontWeight: 400,
    lineHeight: 'normal',
    fontStyle: 'normal',
    fontFamily: CUSTOM_TYPOGRAPHY_FONT_FAMILY,
  },
  // Button Styles
  [CUSTOM_TYPOGRAPHY_TYPES.button]: {
    fontSize: '1px',
    fontWeight: 600,
    lineHeight: '150%',
    fontStyle: 'normal',
    fontFamily: CUSTOM_TYPOGRAPHY_FONT_FAMILY,
  },
  [CUSTOM_TYPOGRAPHY_TYPES.buttonMobile]: {
    fontSize: '1px',
    fontWeight: 600,
    lineHeight: '150%',
    fontStyle: 'normal',
    fontFamily: CUSTOM_TYPOGRAPHY_FONT_FAMILY,
  },
} as const satisfies Record<
  string,
  Required<Required<Pick<CSSProperties, 'fontSize' | 'fontWeight' | 'lineHeight' | 'fontStyle' | 'fontFamily'>>>
>;
