import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import svelteEmailTailwind from 'svelte-email-tailwind/vite';
import { vite as vidstack } from 'vidstack/plugins';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		tailwindcss(),
		vidstack(),
		sveltekit(),
		svelteEmailTailwind({
			pathToEmailFolder: '/src/lib/server/emails/templates'
		})
	]
});
