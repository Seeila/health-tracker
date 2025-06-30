import js from '@eslint/js';
import svelte from 'eslint-plugin-svelte';
import globals from 'globals';
import ts from 'typescript-eslint';
import eslintNestJs from '@darraghor/eslint-plugin-nestjs-typed';


export const config = ts.config(
  js.configs.recommended,
  tseslint.configs.strictTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  ...svelte.configs['flat/recommended'],
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      }
    }
  },
  {
    files: ['**/*.svelte'],
    ignores: ['.svelte-kit/*'],
    languageOptions: {
      parserOptions: {
        parser: ts.parser
      }
    }
  },
  {
    files: ['api/*.ts', 'api/*.js'],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest
      },
      ecmaVersion: 2024,
      sourceType: 'module',
      parserOptions: {
        parser: ts.parser,
        projectService: true,
        tsconfigRootDir: import.meta.dirname
      }
    },
    plugins: {
      prettier,
      eslintNestJs
    },
  }
);
