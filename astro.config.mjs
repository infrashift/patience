// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { existsSync } from 'node:fs';

const BASE = '/patience';

const REPO = 'https://github.com/infrashift/patience';

/**
 * Dev-only: serve `public/<dir>/index.html` for `/<base>/<dir>` and `/<base>/<dir>/`,
 * matching GitHub Pages and `astro preview`. (Vite's dev server doesn't resolve
 * directory indexes for files in `public/`, so `/patience/clock/` would 404 in `make dev`.)
 */
const publicDirectoryIndex = {
  name: 'public-directory-index',
  hooks: {
    'astro:server:setup': ({ server }) => {
      server.middlewares.use((req, res, next) => {
        const [path, query = ''] = (req.url ?? '').split('?');
        // Astro may already have stripped the base from req.url, so accept it either way.
        const match = path.match(new RegExp(`^(?:${BASE})?/(.+?)/?$`));
        const dir = match?.[1];
        if (dir && !dir.includes('.') && existsSync(`public/${dir}/index.html`)) {
          const q = query ? `?${query}` : '';
          if (!path.endsWith('/')) {
            res.writeHead(301, { Location: `${BASE}/${dir}/${q}` });
            return res.end();
          }
          req.url = `${path.startsWith(BASE + '/') ? BASE : ''}/${dir}/index.html${q}`;
        }
        next();
      });
    },
  },
};

// https://astro.build/config
export default defineConfig({
  // Served from GitHub Pages as a project site: https://infrashift.github.io/patience/
  site: 'https://infrashift.github.io',
  base: BASE,
  integrations: [
    publicDirectoryIndex,
    starlight({
      title: 'PATIENCE',
      description:
        'PATIENCE, Cat Laser Wall Clock (忍耐・猫時計) — an enterprise-grade feline kinetic portrait & ocular laser chronometer by Infrashift.io.',
      logo: { light: './src/assets/logo-light.svg', dark: './src/assets/logo-dark.svg', alt: 'PATIENCE cat clock logo' },
      favicon: '/favicon.svg',
      social: [
        { icon: 'github', label: 'GitHub', href: REPO },
        { icon: 'external', label: 'Infrashift.io', href: 'https://infrashift.io' },
      ],
      editLink: { baseUrl: `${REPO}/edit/main/` },
      lastUpdated: true,
      customCss: ['./src/styles/custom.css'],
      sidebar: [
        { label: 'Launch the Clock', link: '/clock/', attrs: { target: '_self' } },
        { label: 'Features', slug: 'features' },
        {
          label: 'Guides',
          items: [
            { label: 'Running PATIENCE', slug: 'guides/running' },
            { label: 'Calibration', slug: 'guides/calibration' },
            { label: 'Local development', slug: 'guides/development' },
          ],
        },
        { label: 'Contributing', slug: 'contributing' },
        { label: 'Sponsor', slug: 'sponsor' },
        { label: 'License', slug: 'license' },
      ],
    }),
  ],
});
