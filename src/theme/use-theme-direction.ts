import { useContext } from 'react';
import { ThemeContext } from './dynamic-theme-provider';

/**
 * Hook to get the current theme direction and RTL status
 * @returns {object} { direction: 'ltr' | 'rtl', isRtl: boolean }
 *
 * @example
 * ```tsx
 * const MyComponent = () => {
 *   const { direction, isRtl } = useThemeDirection();
 *
 *   return (
 *     <div dir={direction}>
 *       {isRtl ? 'RTL Content' : 'LTR Content'}
 *     </div>
 *   );
 * };
 * ```
 */
export const useThemeDirection = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useThemeDirection must be used within a DynamicThemeProvider');
  }

  return context;
};
