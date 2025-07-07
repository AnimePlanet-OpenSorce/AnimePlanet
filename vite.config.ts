import { sveltekit } from '@sveltejs/kit/vite';
import { MagicRegExpTransformPlugin } from 'magic-regexp/transform';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit(), MagicRegExpTransformPlugin.vite()]
});
