import autoAdapter from '@sveltejs/adapter-auto';
import staticAdapter from '@sveltejs/adapter-static';
import netlifyAdapter from '@sveltejs/adapter-netlify';
import vercelAdapter from '@sveltejs/adapter-vercel';
import nodeAdapter from '@sveltejs/adapter-node';

import { vitePreprocess } from '@sveltejs/kit/vite';

let selectedAdapter;
const isVercel = process.env.DEPLOY_TARGET === 'VERCEL' || process.env.VERCEL === '1';

if (process.env.DEPLOY_TARGET === 'NETLIFY') {
  selectedAdapter = netlifyAdapter();
} else if (isVercel) {
  selectedAdapter = vercelAdapter({ runtime: 'edge' });
} else if (process.env.DEPLOY_TARGET === 'NODE') {
  selectedAdapter = nodeAdapter();
} else if (process.env.DEPLOY_TARGET === 'STATIC') {
  selectedAdapter = staticAdapter();
} else {
  selectedAdapter = autoAdapter();
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: selectedAdapter,
    alias: {
      '$src/*': 'src/*',
    },
    prerender: {
      handleMissingId: 'ignore',
      crawl: true,
    }
  }
};

export default config;
