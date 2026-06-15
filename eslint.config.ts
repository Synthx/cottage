import { defineConfig, globalIgnores } from 'eslint/config';
import js from '@eslint/js';
import eslintPluginAstro from 'eslint-plugin-astro';
import tseslint from 'typescript-eslint';

export default defineConfig([
    globalIgnores(['.astro', 'dist']),
    js.configs.recommended,
    tseslint.configs.recommended,
    eslintPluginAstro.configs.recommended,
]);
