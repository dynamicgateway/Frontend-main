// @ts-nocheck
/** @type {import('prettier-plugin-tailwindcss')} */

/** @type {import('prettier').Config} */

export default {
  overrides: [
    {
      files: '*.ts?(x)',
      options: {
        parser: 'typescript',
      },
    },
  ],
  plugins: ['prettier-plugin-tailwindcss'],
  importOrder: [],
  singleQuote: true,
  printWidth: 120,
  trailingComma: 'es5',
  semi: true,
  tailwindAttributes: [
    'class',
    'className',

    // For the `classes` prop of MUI components
    'classes',
  ],
  tailwindFunctions: ['tw', 'twObject', 'twMerge', 'twJoin', 'twConsumeCssVar'],
};
