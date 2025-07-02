import js from "@eslint/js";
import svelte from "eslint-plugin-svelte";
import globals from "globals";
import ts from "typescript-eslint";
import eslintNestJs from "@darraghor/eslint-plugin-nestjs-typed";

// Base configuration for all projects
export const baseConfig = ts.config(
  js.configs.recommended,
  ...ts.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  {
    ignores: [
      "**/node_modules/**",
      "**/dist/**",
      "**/build/**",
      "**/.svelte-kit/**",
      "**/coverage/**",
    ],
  },
);

// SvelteKit specific configuration
export const svelteConfig = ts.config(
  ...baseConfig,
  ...svelte.configs["flat/recommended"],
  {
    files: ["**/*.svelte"],
    languageOptions: {
      parserOptions: {
        parser: ts.parser,
        extraFileExtensions: [".svelte"],
      },
    },
  },
  {
    files: ["**/*.ts", "**/*.js"],
    ignores: [
      "**/*.config.js",
      "**/*.config.ts",
      "**/svelte.config.js",
      "**/playwright.config.ts",
    ],
    languageOptions: {
      parserOptions: {
        projectService: {
          allowDefaultProject: ["*.js", "*.mjs"],
        },
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    files: [
      "**/*.config.js",
      "**/*.config.ts",
      "**/svelte.config.js",
      "**/playwright.config.ts",
      "**/.prettierrc.cjs",
    ],
    rules: {
      "@typescript-eslint/no-require-imports": "off",
    },
  },
);

// NestJS specific configuration
export const nestConfig = ts.config(...baseConfig, {
  files: ["**/*.ts"],
  languageOptions: {
    globals: {
      ...globals.node,
      ...globals.jest,
    },
    parserOptions: {
      projectService: {
        allowDefaultProject: ["*.js", "*.mjs"],
      },
      tsconfigRootDir: import.meta.dirname,
    },
  },
  plugins: {
    "@darraghor/nestjs-typed": eslintNestJs,
  },
  rules: {
    // Add some common NestJS-friendly rules
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "off",
  },
});

// UI package configuration
export const uiConfig = ts.config(
  ...baseConfig,
  ...svelte.configs["flat/recommended"],
  {
    files: ["**/*.svelte"],
    languageOptions: {
      parserOptions: {
        parser: ts.parser,
        extraFileExtensions: [".svelte"],
      },
    },
  },
  {
    files: ["**/*.ts"],
    ignores: ["**/*.config.js", "**/*.config.ts"],
    languageOptions: {
      parserOptions: {
        projectService: {
          allowDefaultProject: ["*.js", "*.mjs"],
        },
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
);

// Default export for backward compatibility
export const config = baseConfig;
