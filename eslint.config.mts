import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    plugins: { js },
    extends: ['js/recommended'],
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  globalIgnores(['jest.setup.ts', './*.js']),
  tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
]);
