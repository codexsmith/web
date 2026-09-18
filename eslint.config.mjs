import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    // Several retained BFUX/playground controllers deliberately synchronize
    // React state with imperative DOM instrumentation. Keep the new React
    // compiler diagnostics visible without turning this website pass into a
    // behavioral rewrite of those existing instruments.
    files: [
      "src/app/playground/**/*.{ts,tsx}",
      "src/components/bfux/**/*.{ts,tsx}",
      "src/components/paper-mine/**/*.{ts,tsx}",
      "src/components/playground/**/*.{ts,tsx}",
      "src/components/product-catalog-accordion-controller.tsx",
    ],
    rules: {
      "@next/next/no-html-link-for-pages": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
      "react-hooks/immutability": "warn",
      "react-hooks/set-state-in-effect": "warn",
      "react/jsx-no-comment-textnodes": "warn",
    },
  },
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "backlog/**",
    "retired_v1/**",
  ]),
]);
