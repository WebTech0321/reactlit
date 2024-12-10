import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  vite: {
    ssr: {
      noExternal: ['@radix-ui/themes'],
    },
  },
  integrations: [
    starlight({
      title: 'Reactlit',
      logo: { src: '/src/assets/reactlit.svg' },
      customCss: ['/src/styles/app.css'],
      social: {
        github: 'https://github.com/mshafir/reactlit',
      },
      sidebar: [
        {
          label: 'Guides',
          items: [
            { label: 'Getting Started', slug: 'guides/getting-started' },
            { label: 'Installation', slug: 'guides/installation' },
            { label: 'Basics', slug: 'guides/basics' },
            { label: 'Data Fetching', slug: 'guides/data-fetching' },
            { label: 'Managed State', slug: 'guides/managed-state' },
            { label: 'Defining Views', slug: 'guides/defining-views' },
          ],
        },
        // {
        //   label: 'Reference',
        //   autogenerate: { directory: 'reference' },
        // },
      ],
    }),
    react(),
  ],
});