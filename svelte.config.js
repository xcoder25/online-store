import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/kit';

const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter()
  }
};

export default config;
