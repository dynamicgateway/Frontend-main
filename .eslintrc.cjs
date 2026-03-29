const tsExtensionsGlob = 'ts?(x)';
const jsExtensionsGlob = '?(c)js';
const tsJsExtensionsGlob = /** @type {const} */ (`.{${tsExtensionsGlob},${jsExtensionsGlob}}`);

const lodashImportErrorMessage =
  'Please import lodash utils from their individual directories instead, e.g. "import get from \'lodash/get\';".';

const generateConsistentImportsFormatMessage = (/** @type {string} */ importToKeepConsistent) =>
  /** @type {const} */ (
    `Please import from "${importToKeepConsistent}" instead, in the following way: "import { ... } from '${importToKeepConsistent}';"`
  );

/** @type {import('@typescript-eslint/utils').TSESLint.ClassicConfig.Config} */
const config = {
  extends: [
    'eslint:recommended',
    'plugin:@eslint-community/eslint-comments/recommended',
    'plugin:jsonc/recommended-with-jsonc',
    'plugin:json-schema-validator/recommended',
    'plugin:markdown/recommended-legacy',
  ],
  overrides: [
    {
      env: {
        browser: true,
        node: true,
      },
      extends: [
        'plugin:promise/recommended',
        'plugin:@typescript-eslint/recommended-type-checked',
        'plugin:@typescript-eslint/stylistic-type-checked',
        'plugin:import/recommended',
        'plugin:import/react',
        'plugin:import/typescript',
        'plugin:jsx-a11y/recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:react/jsx-runtime',
        'plugin:storybook/recommended',
      ],
      files: `*${tsJsExtensionsGlob}`,
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 'latest',
        project: true,
        sourceType: 'module',
        tsconfigRootDir: __dirname,
      },
      rules: {
        '@eslint-community/eslint-comments/disable-enable-pair': ['error', { allowWholeFile: true }],
        '@eslint-community/eslint-comments/no-unused-disable': 'error',
        '@typescript-eslint/array-type': ['error', { default: 'generic' }],
        '@typescript-eslint/consistent-generic-constructors': 'error',
        '@typescript-eslint/consistent-indexed-object-style': 'error',
        '@typescript-eslint/consistent-type-assertions': 'error',
        '@typescript-eslint/consistent-type-definitions': 'off',
        '@typescript-eslint/consistent-type-imports': ['error', { fixStyle: 'inline-type-imports' }],
        '@typescript-eslint/default-param-last': 'off',
        '@typescript-eslint/naming-convention': 'off',
        '@typescript-eslint/no-import-type-side-effects': 'error',
        '@typescript-eslint/no-restricted-imports': [
          'error',
          {
            paths: [
              /* If lodash utils are imported either as named imports, or through a single namespace, tree shaking does not work properly,
              and all of lodash's exports are included in the final bundle. */
              { name: 'lodash', message: lodashImportErrorMessage },
              { name: 'lodash/', message: lodashImportErrorMessage },
              {
                message: 'Please use `tailwind-merge` instead.',
                name: 'clsx',
              },
              // ------------------------------------------------------------------------------------------
            ],
            patterns: [
              {
                group: ['@material-ui/core/styles', '@material-ui/styles'],
                message: generateConsistentImportsFormatMessage('@material-ui/core'),
              },
              {
                group: ['**/assets/icons', '**/assets', '!@/assets', '!./assets'],
                message: generateConsistentImportsFormatMessage('@/assets'),
              },
            ],
          },
        ],
        '@typescript-eslint/no-unused-vars': ['error', { ignoreRestSiblings: true }],
        '@typescript-eslint/prefer-nullish-coalescing': 'off',
        'comma-spacing': 'off',
        'import/extensions': 'off',
        'import/no-duplicates': ['error', { 'prefer-inline': true }],
        'import/prefer-default-export': 'off',
        'react/function-component-definition': [
          'error',
          {
            namedComponents: 'arrow-function',
            unnamedComponents: 'arrow-function',
          },
        ],
        'react/jsx-no-duplicate-props': ['error', { ignoreCase: false }],
        'react/jsx-props-no-spreading': 'off',
        'react/no-danger': 'off',
        'react/prop-types': 'off',
        'react/require-default-props': 'off',
        'react-hooks/exhaustive-deps': 'off',

        // TypeScript compilation already ensures that the following rules are enforced:
        'import/default': 'off',
        'import/namespace': 'off',
        'import/no-named-as-default-member': 'off',
        // -----------------------------------------------------------
      },
    },
    {
      files: '*.cjs',
      rules: { '@typescript-eslint/no-var-requires': 'off' },
    },
  ],
  root: true,
  settings: {
    'import/resolver': {
      typescript: true,
    },
    react: {
      version: 'detect',
    },
  },
};

module.exports = config;
