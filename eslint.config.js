import pluginJs from '@eslint/js';
// eslint-disable-next-line import/extensions
import auto from 'eslint-config-canonical/configurations/auto.js';
import pluginReact from 'eslint-plugin-react';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  ...auto,
  ...tseslint.config({
    languageOptions: {
      parserOptions: {
        project: [
          './tsconfig.json',
          './tsconfig.node.json',
          './tsconfig.app.json'
        ]
      },
    },
  }),
  {
    files: ['src/**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    rules: {
      'import/no-absolute-path': 'off',
      'import/extensions': [
        'error',
        'never',
        {
          'webp': 'always',
          'svg': 'always',
          'png': 'always',
          'jpg': 'always',
          'jpeg': 'always',
          'gif': 'always',
          'json': 'always',
          'css': 'always',
        }
      ],
      'import/no-unassigned-import': [
        'error',
        {
          allow: [
            '**/*.css',
          ]
        }
      ],
      '@typescript-eslint/consistent-type-definitions': [
        'warn',
        'interface',
      ],
      '@typescript-eslint/no-unused-vars': [
        "error",
        {
          "args": "all",
          "argsIgnorePattern": "^_",
          "caughtErrors": "all",
          "caughtErrorsIgnorePattern": "^_",
          "destructuredArrayIgnorePattern": "^_",
          "varsIgnorePattern": "^_",
          "ignoreRestSiblings": true
        }
      ],
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'variable',
          format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
          leadingUnderscore: 'allow',
          trailingUnderscore: 'allow',
        },
        {
          selector: 'typeLike',
          format: ['PascalCase'],
        },
        {
          selector: 'enumMember',
          format: ['UPPER_CASE'],
        },
      ],
      'no-console': 'warn',
    }
  },
  {
    ignores: ['node_modules', 'dist', 'build', 'coverage', '**/*.json', '**/*.config.js'],
  }
];
