// @ts-check
import { defineConfig, fontProviders, svgoOptimizer } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

import node from '@astrojs/node';

export default defineConfig({
    site: 'http://w2d6n9wxvwvgvfn2qpxvtcf8.217.182.207.128.sslip.io',
    vite: {
        plugins: [tailwindcss()],
    },
    adapter: node({
        mode: 'standalone',
    }),
    fonts: [
        {
            provider: fontProviders.google(),
            name: 'Montserrat',
            cssVariable: '--font-montserrat',
            weights: [400, 600, 700],
        },
        {
            provider: fontProviders.google(),
            name: 'Philosopher',
            cssVariable: '--font-philosopher',
            weights: [400, 600, 700],
        },
    ],
    experimental: {
        svgOptimizer: svgoOptimizer(),
    },
});
