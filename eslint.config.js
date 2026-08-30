import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";
import tseslint from "typescript-eslint";

const compat = new FlatCompat({ baseDirectory: import.meta.dirname });

export default tseslint.config(
  // Build output and generated route types are not ours to lint.
  { ignores: ["dist", ".next", "next-env.d.ts", "node_modules"] },

  // next/core-web-vitals is here for the rules that are really SEO rules:
  // no bare <img>, no <a> for internal navigation, no unoptimised fonts.
  ...compat.extends("next/core-web-vitals"),

  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2022,
      globals: { ...globals.browser, ...globals.node },
    },
    plugins: { "react-hooks": reactHooks },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "@typescript-eslint/no-unused-vars": "off",
    },
  },

  {
    // Vendored shadcn/ui primitives: kept as generated, not hand-maintained.
    files: ["src/components/ui/**"],
    rules: {
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-explicit-any": "off",
    },
  },

  {
    files: ["tailwind.config.ts", "*.config.{js,mjs,ts}"],
    rules: { "@typescript-eslint/no-require-imports": "off" },
  },
);
