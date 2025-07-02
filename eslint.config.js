// This configuration only applies to the package manager root.
import { baseConfig } from "./packages/eslint-config/index.js";

export default [
  ...baseConfig,
  {
    ignores: ["apps/**", "packages/**"],
  },
];
