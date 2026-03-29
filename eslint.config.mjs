import { defineConfig, globalIgnores } from 'eslint/config';
import { fixupConfigRules } from '@eslint/compat';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default defineConfig([
  globalIgnores(['!.storybook', 'package-lock.json', 'dist', 'build', 'storybook-static', 'vite.config.ts.timestamp*']),
  {
    extends: compat.extends(
      'eslint:recommended',
      'plugin:@eslint-community/eslint-comments/recommended',
      'plugin:jsonc/recommended-with-jsonc',
      'plugin:json-schema-validator/recommended',
      'plugin:markdown/recommended-legacy'
    ),

    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.json',
          tsconfigRootDir: __dirname,
        },
      },

      react: {
        version: 'detect',
      },
    },
  },
  {
    files: ['**/*.{ts?(x),?(c)js}'],

    extends: fixupConfigRules(
      compat.extends(
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
        'plugin:storybook/recommended'
      )
    ),

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },

      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module',

      parserOptions: {
        project: true,
        tsconfigRootDir: __dirname,
      },
    },

    rules: {
      '@eslint-community/eslint-comments/disable-enable-pair': [
        'error',
        {
          allowWholeFile: true,
        },
      ],

      '@eslint-community/eslint-comments/no-unused-disable': 'error',

      '@typescript-eslint/array-type': [
        'error',
        {
          default: 'generic',
        },
      ],

      '@typescript-eslint/consistent-generic-constructors': 'error',
      '@typescript-eslint/consistent-indexed-object-style': 'error',
      '@typescript-eslint/consistent-type-assertions': 'error',
      '@typescript-eslint/consistent-type-definitions': 'off',

      '@typescript-eslint/consistent-type-imports': 'off',

      '@typescript-eslint/default-param-last': 'off',
      '@typescript-eslint/naming-convention': 'off',
      '@typescript-eslint/no-import-type-side-effects': 'error',

      '@typescript-eslint/no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: 'lodash',
              message:
                'Please import lodash utils from their individual directories instead, e.g. "import get from \'lodash/get\';".',
            },
            {
              name: 'lodash/',
              message:
                'Please import lodash utils from their individual directories instead, e.g. "import get from \'lodash/get\';".',
            },
            {
              message: 'Please use `tailwind-merge` instead.',
              name: 'clsx',
            },
          ],

          patterns: [
            {
              group: ['@material-ui/core/styles', '@material-ui/styles'],
              message:
                'Please import from "@material-ui/core" instead, in the following way: "import { ... } from \'@material-ui/core\';"',
            },
            {
              group: ['**/assets/icons', '**/assets', '!@/assets', '!./assets'],
              message:
                'Please import from "@/assets" instead, in the following way: "import { ... } from \'@/assets\';"',
            },
          ],
        },
      ],

      '@typescript-eslint/prefer-nullish-coalescing': 'off',
      'comma-spacing': 'off',
      'import/extensions': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-misused-promises': 'off',
      '@typescript-eslint/no-floating-promises': 'off',
      '@typescript-eslint/restrict-template-expressions': 'off',
      '@typescript-eslint/no-redundant-type-constituents': 'off',
      '@typescript-eslint/require-await': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      'no-useless-catch': 'off',
      '@typescript-eslint/no-unused-vars': 'off',

      'import/no-duplicates': [
        'error',
        {
          'prefer-inline': true,
        },
      ],

      'import/prefer-default-export': 'off',

      'react/function-component-definition': [
        'error',
        {
          namedComponents: 'arrow-function',
          unnamedComponents: 'arrow-function',
        },
      ],

      'react/jsx-no-duplicate-props': [
        'error',
        {
          ignoreCase: false,
        },
      ],

      'react/jsx-props-no-spreading': 'off',
      'react/no-danger': 'off',
      'react/prop-types': 'off',
      'react/require-default-props': 'off',
      'react-hooks/exhaustive-deps': 'off',
      'import/default': 'off',
      'import/namespace': 'off',
      'import/no-named-as-default-member': 'off',
      'jsx-a11y/click-events-have-key-events': 'off',
      'jsx-a11y/no-static-element-interactions': 'off',
    },
  },
  {
    files: ['**/*.cjs'],

    rules: {
      '@typescript-eslint/no-var-requires': 'off',
    },
  },
]);
