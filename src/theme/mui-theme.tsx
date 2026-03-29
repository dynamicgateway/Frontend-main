import type { FC, PropsWithChildren } from 'react';

import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { createTheme, ThemeProvider } from '@mui/material';
import { TssCacheProvider } from 'tss-react';

import { colors } from './colors';
import { fontFamilies } from './typography';

const muiCache = createCache({
  key: 'mui',
  prepend: true,
});

const tssCache = createCache({
  key: 'tss',
});

const getRootElement = () => document.getElementById('root');

const theme = createTheme({
  ...colors,
  direction: 'rtl', // Set default direction to RTL for Hebrew
  components: {
    MuiDialog: {
      defaultProps: {
        container: getRootElement,
      },
    },
    MuiMenu: {
      defaultProps: {
        container: getRootElement,
      },
    },
    MuiModal: {
      defaultProps: {
        container: getRootElement,
      },
    },
    MuiPopover: {
      defaultProps: {
        container: getRootElement,
      },
    },
    MuiPopper: {
      defaultProps: {
        container: getRootElement,
      },
    },
    MuiSkeleton: {
      styleOverrides: {
        wave: {
          '&::after': {
            animationDuration: '1.6s',
            animationTimingFunction: 'linear',
            animationDelay: '0s',
            animationIterationCount: 'infinite',
          },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          color: colors.primaryBlue,
          '&.Mui-selected': {
            color: colors.primaryBlue,
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          background: colors.primaryBlue,
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          padding: '0',
        },

        sizeMedium: {
          '& svg': {
            width: '45px',
            height: '45px',
            color: 'white',
            '&:hover': {
              color: '#434752',
            },
          },
        },
        sizeSmall: {
          '& svg': {
            width: '24px',
            height: '24px',
            color: 'white',
            '&:hover': {
              color: '#434752',
            },
          },
        },
      },
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          width: '42px',
          height: '42px',
        },
      },
    },
  },
  palette: {
    primary: {
      main: colors.primaryBlue,
    },
    secondary: {
      light: colors.primaryBlue,
      main: colors.primaryBlue,
    },
  },
  typography: {
    fontFamily: fontFamilies.primary,
  },
});

export const MuiThemeProvider: FC<PropsWithChildren> = ({ children }) => (
  <CacheProvider value={muiCache}>
    <TssCacheProvider value={tssCache}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </TssCacheProvider>
  </CacheProvider>
);
