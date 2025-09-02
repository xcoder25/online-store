import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// adapter-node builds a production-ready Node.js server.
		// This is necessary for a "Web Service" deployment on platforms like Render.
		adapter: adapter(),

		// Explicitly define the build directory to match the adapter's output.
		// By default, adapter-node uses 'build'.
		outDir: 'build'
	}
};

export default config;
