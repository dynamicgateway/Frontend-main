import React, { createContext, useContext, useEffect, useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { TssCacheProvider } from 'tss-react';
import { useSelector } from 'react-redux';
import { selectLanguage, selectDirection } from '@/store/slices/system';
import { createTheme } from '@mui/material';
import { colors } from './colors';
import { fontFamilies } from './typography';

// Create emotion cache for RTL support
const createEmotionCache = (isRtl: boolean) => {
  return createCache({
    key: isRtl ? 'mui-rtl' : 'mui-ltr',
    prepend: true,
  });
};

interface ThemeContextType {
  direction: 'ltr' | 'rtl';
  isRtl: boolean;
}

const ThemeContext = createContext<ThemeContextType>({
  direction: 'rtl',
  isRtl: true,
});

// Export the context for use in other files
export { ThemeContext };
export const useThemeDirection = () => useContext(ThemeContext);

interface DynamicThemeProviderProps {
  children: React.ReactNode;
}

export const DynamicThemeProvider: React.FC<DynamicThemeProviderProps> = ({ children }) => {
  const language = useSelector(selectLanguage);
  const direction = useSelector(selectDirection);

  // Convert direction to Material-UI direction format
  const muiDirection = direction === 'rtl' ? 'rtl' : 'ltr';
  const isRtl = muiDirection === 'rtl';

  const [emotionCache, setEmotionCache] = useState(() => createEmotionCache(isRtl));

  // Update emotion cache when direction changes
  useEffect(() => {
    setEmotionCache(createEmotionCache(isRtl));
  }, [isRtl]);

  // Create theme with current direction
  const theme = createTheme({
    ...colors,
    direction: muiDirection,
    components: {
      MuiDialog: {
        defaultProps: {
          container: () => document.getElementById('root'),
        },
      },
      MuiMenu: {
        defaultProps: {
          container: () => document.getElementById('root'),
        },
      },
      MuiModal: {
        defaultProps: {
          container: () => document.getElementById('root'),
        },
      },
      MuiPopover: {
        defaultProps: {
          container: () => document.getElementById('root'),
        },
      },
      MuiPopper: {
        defaultProps: {
          container: () => document.getElementById('root'),
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
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              borderRadius: '12px',
              backgroundColor: colors.white,
              paddingRight: '0',
              paddingLeft: '0',
              '& fieldset': {
                borderColor: colors.gray,
                borderWidth: '1px',
              },
              '&:hover fieldset': {
                borderColor: colors.primaryBlue,
              },
              '&.Mui-focused fieldset': {
                borderColor: colors.primaryBlue,
                borderWidth: '2px',
              },
            },
            '& .MuiInputBase-input': {
              textAlign: direction === 'rtl' ? 'right' : 'left',
              padding: '16px 16px 16px 12px',
              fontSize: '16px',
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            '& .MuiButton-endIcon': {
              marginLeft: direction === 'rtl' ? '0' : '8px',
              marginRight: direction === 'rtl' ? '8px' : '0',
            },
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
      fontFamily: fontFamilies.roboto,
    },
  });

  return (
    <ThemeContext.Provider
      value={{
        direction: muiDirection,
        isRtl,
      }}
    >
      <CacheProvider value={emotionCache}>
        <TssCacheProvider value={emotionCache}>
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </TssCacheProvider>
      </CacheProvider>
    </ThemeContext.Provider>
  );
};
