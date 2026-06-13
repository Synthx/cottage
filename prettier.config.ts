import type { Config } from 'prettier';

const config: Config = {
    tabWidth: 4,
    singleQuote: true,
    semi: true,
    plugins: ['prettier-plugin-astro', 'prettier-plugin-tailwindcss'],
    overrides: [
        {
            files: '*.astro',
            options: {
                parser: 'astro',
            },
        },
        {
            files: '*.svg',
            options: {
                parser: 'html',
            },
        },
    ],
};

export default config;
