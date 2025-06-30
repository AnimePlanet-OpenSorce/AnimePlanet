import { preprocessMeltUI, sequence } from '@melt-ui/pp';
import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';

const config = {
	preprocess: sequence([vitePreprocess(), mdsvex(), preprocessMeltUI()]),
	kit: { adapter: adapter() },
	extensions: ['.svelte', '.svx']
};

export default config;
