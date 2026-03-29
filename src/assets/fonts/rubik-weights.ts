export const rubikWeights = {
  light: 300,
  regular: 400,
  medium: 500,
  semiBold: 600,
  bold: 700,
  extraBold: 800,
  black: 900,
} as const;

export const rubikStyles = {
  normal: 'normal',
  italic: 'italic',
} as const;

export type RubikWeight = keyof typeof rubikWeights;
export type RubikStyle = keyof typeof rubikStyles;

export const getRubikFont = (weight: RubikWeight = 'regular', style: RubikStyle = 'normal') => {
  return {
    fontFamily: 'Rubik, sans-serif',
    fontWeight: rubikWeights[weight],
    fontStyle: rubikStyles[style],
  };
};

// Predefined font combinations for common use cases
export const rubikFonts = {
  heading: getRubikFont('bold'),
  subheading: getRubikFont('semiBold'),
  body: getRubikFont('regular'),
  caption: getRubikFont('light'),
  button: getRubikFont('medium'),
} as const;
