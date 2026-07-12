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
            name: 'Mulish',
            cssVariable: '--font-mulish',
            weights: [300, 400, 500, 600, 700],
        },
        {
            provider: fontProviders.google(),
            name: 'Cormorant Garamond',
            cssVariable: '--font-cormorant',
            weights: [500, 600],
            styles: ['normal', 'italic'],
        },
    ],
    experimental: {
        svgOptimizer: svgoOptimizer(),
    },
});
