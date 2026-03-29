import type { ValueOf } from 'type-fest';

/** Colors defined in Figma design system. Property 100 is an original color.*/
export const colors = {
  white: '#fff',
  black: '#10110F',
  primaryBlue: '#027DB3',
  primaryLightBlue: '#e6f2f7',
  secondaryBlue: '#07BED1',
  secondaryLightBlue: '#F8FAFC',
  secondaryMediumBlue: '#83DFE8',
  secondaryDarkBlue: '#034C54',
  thirdLightBlue: '#CDF2F6',
  gray: '#DED9D9',
  darkGrey: '#484848',
  lightGrey: '#F5F6F8',
  disabledGray: '#6B7280',
  accenture: '#5CEBBE',
  lightAccenture: '#EFFDFA',
  darkAccenture: '#2E765F',
  background: '#F5FAFC',

  error: '#EA4C34',
  bottomNavBg: '#D7EAF3',

  transparent: 'transparent',
} as const satisfies Record<string, Record<string, string> | string>;

export type Colors = typeof colors;
export type ColorHueKey = keyof Colors;
export type ColorHue = ValueOf<Colors>;
export type Color = ValueOf<ColorHue>;
