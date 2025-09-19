// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'
import js from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";


export default withNuxt(
  // Your custom configs here
  [
  js.configs.recommended,
   {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: await import("@typescript-eslint/parser"),
    },
    plugins: {
      "@typescript-eslint": tseslint,
    },
    rules: {
      // turn off type rules
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/no-unsafe-return": "off",
      "@typescript-eslint/restrict-template-expressions": "off",
      "@typescript-eslint/restrict-plus-operands": "off",
    },
   }
]
)
