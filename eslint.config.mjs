import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import typescriptPlugin from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";

export default defineConfig([
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        React: "readonly",
        JSX: "readonly",
        window: "readonly",
        document: "readonly",
        console: "readonly",
        process: "readonly",
        __dirname: "readonly",
        MediaQueryList: "readonly",
        MediaQueryListEvent: "readonly",
        HTMLElement: "readonly",
        HTMLDivElement: "readonly",
        HTMLHeadingElement: "readonly",
        HTMLParagraphElement: "readonly",
        HTMLButtonElement: "readonly",
        HTMLAnchorElement: "readonly",
        ScrollTrigger: "readonly",
      },
    },
    plugins: {
      "@typescript-eslint": typescriptPlugin,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...typescriptPlugin.configs.recommended.rules,
      "@typescript-eslint/no-unused-vars": ["error", { 
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^(React|ScrollTrigger)$"
      }],
    },
  },
  {
    ignores: [
      ".next/**",
      "out/**",
      "build/**",
      "node_modules/**",
      "next-env.d.ts",
    ],
  },
]);
