module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
  },
  plugins: [
    "astro",
    "react",
    "@typescript-eslint",
    "unused-imports",
    "simple-import-sort",
  ],
  overrides: [
    {
      // React-specific overrides
      files: ["*.jsx", "*.tsx"],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      extends: [
        "plugin:react/recommended",
        "plugin:react-hooks/recommended",
      ],
   rules: {
    "react/react-in-jsx-scope": "off",
    "react/jsx-uses-react": "off",
    "react/display-name": "off",
    "no-console": ["warn", { allow: ["warn", "error"] }],
    //#region  //*=========== Typescript Eslint===========
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    //#region  //*=========== Unused Import ===========
    "@typescript-eslint/no-unused-vars": "off",
    "unused-imports/no-unused-imports": "warn",
    "unused-imports/no-unused-vars": [
      "warn",
      {
        vars: "all",
        varsIgnorePattern: "^_",
        args: "after-used",
        argsIgnorePattern: "^_",
      },
    ],

    "simple-import-sort/exports": "warn",
    "react/display-name": "off", 
    },
  },
    {
      // Astro-specific overrides
      files: ["*.astro"],
      parser: "astro-eslint-parser",
      parserOptions: {
        parser: "@typescript-eslint/parser",
        ecmaVersion: 2021,
        sourceType: "module",
        extraFileExtensions: [".astro"],
      },
      extends: [
        "plugin:astro/recommended",
        "prettier",
      ],
      rules: {
  
      },
    },
  ],
  settings: {
    react: {
      version: "detect",
    },
  },
};
