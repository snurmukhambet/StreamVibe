// eslint.config.js
import globals from 'globals';
import pluginJs from '@eslint/js'; // ESLint's core recommended rules
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js';
import pluginJsxA11y from 'eslint-plugin-jsx-a11y'; // <--- CORRECTED: Import the plugin directly
import eslintConfigPrettier from 'eslint-config-prettier'; // Disables rules that conflict with Prettier

export default [
  {
    // Global ignores
    ignores: ['dist/', 'node_modules/', 'public/'],
  },
  // Core ESLint recommended rules
  pluginJs.configs.recommended,

  // React specific linting
  {
    files: ['**/*.{js,jsx}'], // Apply these rules only to .js and .jsx files
    ...pluginReactConfig, // This correctly spreads the React recommended config
    settings: {
      react: {
        version: 'detect', // Automatically detect React version
      },
    },
    rules: {
      ...pluginReactConfig.rules, // Spread the recommended rules
      'react/react-in-jsx-scope': 'off', // Not needed for modern JSX transform
      'react/prop-types': 'off', // If you're not using prop-types
      // Note: If you want to use the new JSX transform (React 17+), you might also want to add:
      // ...pluginReact.configs['jsx-runtime'].rules, // assuming you also import pluginReact = "eslint-plugin-react"
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.node, // Or globals.es2021 if more specific
      },
    },
  },

  // JSX Accessibility specific linting
  {
    files: ['**/*.{js,jsx}'],
    plugins: {
      'jsx-a11y': pluginJsxA11y, // <--- CORRECTED: Register the plugin
    },
    rules: {
      ...pluginJsxA11y.configs.recommended.rules, // <--- CORRECTED: Access recommended rules via .configs
      // You can override or add jsx-a11y rules here if needed
    },
  },

  // Prettier config - must be last to override other formatting rules
  eslintConfigPrettier,

  // Any custom project-wide rules can go here
  // {
  //   rules: {
  //     'no-unused-vars': 'warn',
  //     // Add other custom rules
  //   }
  // }
];