export const customFonts = {
  primary: 'Rubik',
  fallback: 'sans-serif',
} as const;

export const getFontFamily = (fontName: keyof typeof customFonts = 'primary') => {
  return `"${customFonts[fontName]}", ${customFonts.fallback}`;
};

// Export Rubik-specific utilities
export * from './rubik-weights';
