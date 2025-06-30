/** @type {import("prettier").Config} */
const baseConfig = require("../../packages/eslint-config/prettier-base.cjs");

module.exports = {
  ...baseConfig,
  plugins: ["prettier-plugin-svelte"],
  overrides: [{ files: "*.svelte", options: { parser: "svelte" } }],
};
