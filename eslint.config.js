// @ts-nocheck
import path from "node:path";
import globals from "globals";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";

// Dynamically import CommonJS plugins (security temporarily disabled until it's compatible with ESM)
const importPlugin = await import("eslint-plugin-import").then(
  (mod) => mod.default || mod
);
const unicorn = await import("eslint-plugin-unicorn").then(
  (mod) => mod.default || mod
);
// const security = await import("eslint-plugin-security-node").then((mod) => mod.default || mod);

const dirname = path.dirname(new URL(import.meta.url).pathname); // Correct way to get __dirname in ESM
const compat = new FlatCompat({
  baseDirectory: dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  // Use export default
  ...compat.extends("eslint:recommended"),
  // ...compat.extends("plugin:security-node/recommended"),
  {
    plugins: {
      import: importPlugin, // Use imported plugin
      unicorn,
      // security,
    },

    languageOptions: {
      ecmaVersion: 13, // 2022
      sourceType: "module", // "module" for ESM, "script" for CommonJS
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jquery,
        jQuery: "readonly",
        $: "readonly",
      },
    },

    rules: {
      ...js.configs.recommended.rules, // Spread recommended rules
      // Airbnb base rules
      "import/no-unresolved": "error", // Resolves modules that cannot be found
      "import/named": "error", // Ensure named imports match the exported ones
      "import/default": "error", // Ensure default imports match the module exports
      "import/namespace": "error", // Ensure namespace imports match module exports
      "import/no-duplicates": "error", // Disallow duplicate imports
      "import/no-extraneous-dependencies": "error", // Disallow extraneous dependencies
      "import/no-mutable-exports": "error", // Disallow mutable exports
      "import/no-named-as-default-member": "error", // Disallow named imports as default
      "import/no-named-as-default": "error", // Disallow named imports as default
      "import/no-unassigned-import": "error", // Disallow unassigned imports
      "import/no-unused-modules": "error", // Disallow unused modules
      eqeqeq: ["error", "always"], // Enforces strict equality (eqeqeq rule)
      "no-console": "warn", // Warn about console usage
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }], // Warn about unused variables except for those starting with "_"
      semi: ["error", "always"], // Enforce semicolons at the end of statements
      indent: 0, // Allow indentation
      quotes: 0, // Allow double quotes
      "no-trailing-spaces": "error", // Disallow trailing spaces
      "brace-style": ["error", "1tbs"], // Enforce 1TBS (One True Brace Style) for code blocks
      "no-underscore-dangle": "off", // Allow underscore dangle
      "prefer-const": "error", // Enforce the use of const for variables that are not reassigned
      "object-shorthand": "error", // Enforce the use of object shorthand
      "no-var": "error", // Disallow var usage (use let/const)
      "prefer-arrow-callback": "error", // Enforce arrow functions for callbacks
      "arrow-body-style": ["error", "as-needed"], // Prefer shorthand arrow function syntax
      "prefer-template": "error", // Enforce the use of template literals instead of string concatenation
      "prefer-rest-params": "error", // Enforce the use of rest parameters instead of arguments
      "prefer-spread": "error", // Enforce the use of spread operator instead of arguments
      "prefer-numeric-literals": "error", // Enforce the use of numeric literals instead of Number objects
      "prefer-exponentiation-operator": "error", // Enforce the use of exponentiation operator instead of Math.pow
      "no-restricted-syntax": "error", // Disallow use of certain restricted syntax
      "no-restricted-globals": "error", // Disallow use of certain globals

      // Security rules (temporarily disabled while we wait for eslint-plugin-security to be ESM compatible)
      // "security/detect-possible-timing-attacks": "error",
      // "security/detect-object-injection": 0,
      // "security/detect-non-literal-fs-filename": "error",
      // "security/detect-non-literal-require": "error",

      // Additional rules
      camelcase: 0,
      "comma-dangle": 0,
      "consistent-return": 0,
      "func-names": "error",
      "linebreak-style": 0,
      "max-len": 0,
      "newline-per-chained-call": 0,
      "no-param-reassign": 0,
      "object-curly-newline": 0,
      "operator-linebreak": 0,
      "prefer-destructuring": "error",

      // Unicorn rules
      "unicorn/better-regex": "error",
      "unicorn/catch-error-name": 0,
      "unicorn/consistent-destructuring": "error",
      "unicorn/consistent-function-scoping": "error",
      "unicorn/custom-error-definition": "off",
      "unicorn/empty-brace-spaces": "error",
      "unicorn/error-message": "error",
      "unicorn/escape-case": "error",
      "unicorn/expiring-todo-comments": 0,
      "unicorn/explicit-length-check": "error",
      "unicorn/filename-case": 0,
      "unicorn/import-index": "off",
      "unicorn/import-style": "error",
      "unicorn/new-for-builtins": "error",
      "unicorn/no-abusive-eslint-disable": "error",
      "unicorn/no-array-callback-reference": "error",
      "unicorn/no-array-for-each": 0,
      "unicorn/no-array-method-this-argument": "error",
      "unicorn/prefer-single-call": "error",
      "unicorn/no-array-reduce": "error",
      "unicorn/no-await-expression-member": "error",
      "unicorn/no-console-spaces": "error",
      "unicorn/no-document-cookie": "error",
      "unicorn/no-empty-file": "error",
      "unicorn/no-for-loop": "error",
      "unicorn/no-hex-escape": "error",
      "unicorn/no-instanceof-array": "error",
      "unicorn/no-invalid-remove-event-listener": "error",
      "unicorn/no-keyword-prefix": "off",
      "unicorn/no-lonely-if": "error",
      "no-nested-ternary": "off",
      "unicorn/no-nested-ternary": "error",
      "unicorn/no-new-array": "error",
      "unicorn/no-new-buffer": "error",
      "unicorn/no-null": 0,
      "unicorn/no-object-as-default-parameter": "error",
      "unicorn/no-process-exit": "error",
      "unicorn/no-static-only-class": "error",
      "unicorn/no-thenable": "error",
      "unicorn/no-this-assignment": "error",
      "unicorn/no-unreadable-array-destructuring": "error",
      "unicorn/no-unsafe-regex": "off",
      "unicorn/no-unused-properties": "off",
      "unicorn/no-useless-fallback-in-spread": "error",
      "unicorn/no-useless-length-check": "error",
      "unicorn/no-useless-promise-resolve-reject": "error",
      "unicorn/no-useless-spread": "error",
      "unicorn/no-useless-undefined": "error",
      "unicorn/no-zero-fractions": "error",
      "unicorn/number-literal-case": "error",
      "unicorn/numeric-separators-style": 0,
      "unicorn/prefer-add-event-listener": "error",
      "unicorn/prefer-array-find": "error",
      "unicorn/prefer-array-flat": "error",
      "unicorn/prefer-array-flat-map": "error",
      "unicorn/prefer-array-index-of": "error",
      "unicorn/prefer-array-some": "error",
      "unicorn/prefer-at": "off",
      "unicorn/prefer-code-point": "error",
      "unicorn/prefer-date-now": "error",
      "unicorn/prefer-default-parameters": "error",
      "unicorn/prefer-dom-node-append": "error",
      "unicorn/prefer-dom-node-dataset": "error",
      "unicorn/prefer-dom-node-remove": "error",
      "unicorn/prefer-dom-node-text-content": "error",
      "unicorn/prefer-export-from": "error",
      "unicorn/prefer-includes": "error",
      "unicorn/prefer-json-parse-buffer": "error",
      "unicorn/prefer-keyboard-event-key": "error",
      "unicorn/prefer-math-trunc": "error",
      "unicorn/prefer-modern-dom-apis": "error",
      "unicorn/prefer-module": 0,
      "unicorn/prefer-negative-index": "error",
      "unicorn/prefer-node-protocol": 0,
      "unicorn/prefer-number-properties": "error",
      "unicorn/prefer-object-from-entries": "error",
      "unicorn/prefer-optional-catch-binding": "error",
      "unicorn/prefer-prototype-methods": "error",
      "unicorn/prefer-query-selector": "error",
      "unicorn/prefer-reflect-apply": "error",
      "unicorn/prefer-regexp-test": "error",
      "unicorn/prefer-set-has": "error",
      "unicorn/prefer-spread": "error",
      "unicorn/prefer-string-replace-all": "off",
      "unicorn/prefer-string-slice": "error",
      "unicorn/prefer-string-starts-ends-with": "error",
      "unicorn/prefer-string-trim-start-end": "error",
      "unicorn/prefer-switch": "error",
      "unicorn/prefer-ternary": "error",
      "unicorn/prefer-top-level-await": "off",
      "unicorn/prefer-type-error": "error",
      "unicorn/prevent-abbreviations": 0,
      "unicorn/relative-url-style": "error",
      "unicorn/require-array-join-separator": "error",
      "unicorn/require-number-to-fixed-digits-argument": "error",
      "unicorn/require-post-message-target-origin": "off",
      "unicorn/string-content": "off",
      "unicorn/template-indent": "warn",
      "unicorn/throw-new-error": "error",
    },
  },
];
