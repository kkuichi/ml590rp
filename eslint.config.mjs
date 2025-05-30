import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: ['next/core-web-vitals', 'next/typescript', 'prettier'],
    rules: {
      'prefer-template': ['warn'],
      'prefer-const': 'error',
      'no-var': 'error',
      'react/display-name':'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      'no-implicit-coercion': [
        'error',
        {
          boolean: true,
          number: false,
          string: false,
        },
      ],
      '@typescript-eslint/array-type': [
        'error',
        { default: 'generic', readonly: 'generic' }, 
      ],
      'arrow-body-style': ['warn', 'as-needed'],
      'object-shorthand': ['error', 'always'],
      'react/self-closing-comp': 'error',
      'react-hooks/exhaustive-deps': 'error',
      'react/no-array-index-key': 'error',
      'react/jsx-boolean-value': ['error', 'never'],
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'interface',
          format: ['PascalCase'],
          custom: {
            regex: '^I[A-Z]',
            match: true,
          },
        },
        {
          selector: 'typeAlias',
          format: ['PascalCase'],
          custom: {
            regex: '^T[A-Z]',
            match: true,
          },
        },
        {
          selector: 'enum',
          format: ['PascalCase'],
          custom: {
            regex: '^E[A-Z]',
            match: true,
          },
        },
      ],
    },
    overrides: [
      {
        files: ['src/components/**/*.tsx', 'src/components/**/*.ts'],
        rules: {
          'import/no-default-export': 'error',
        },
      },
    ],
  }),
];

export default eslintConfig;