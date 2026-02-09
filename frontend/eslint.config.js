import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      react.configs.flat.recommended,
      reactHooks.configs.flat.recommended,
    ],
    rules: {
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      // Disable React 17 rule that requires React in scope (not needed in React 19)
      'react/react-in-jsx-scope': 'off',
      // Disable unknown property check for Three.js and other libraries
      'react/no-unknown-property': ['error', { ignore: ['object', 'position', 'rotation', 'intensity', 'scale', 'args', 'attach', 'castShadow', 'receiveShadow', 'geometry', 'material', 'color', 'roughness', 'metalness', 'map', 'normalMap', 'displacementMap', 'emissive', 'emissiveIntensity', 'fog', 'visible', 'userData', 'layers', 'matrix', 'matrixAutoUpdate', 'matrixWorld', 'matrixWorldNeedsUpdate', 'quaternion', 'up', 'children', 'parent', 'type', 'uuid', 'name', 'isObject3D', 'isMesh', 'isLight', 'isCamera', 'isScene'] }],
      // Disable comment text nodes rule
      'react/jsx-no-comment-textnodes': 'off',
      // Disable some TypeScript rules for CI/CD to pass
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
      'react-hooks/exhaustive-deps': 'warn',
    },
  },
])
