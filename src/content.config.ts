import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'zod';

const bedrooms = defineCollection({
    loader: glob({ pattern: '*.md', base: './src/content/bedrooms' }),
    schema: ({ image }) =>
        z.object({
            order: z.number(),
            name: z.string(),
            image: image(),
            capacity: z.number(),
            surface: z.number(),
            bed: z.string(),
            price: z.number(),
            href: z.string(),
            amenities: z.array(z.string()).optional(),
        }),
});

export const collections = { bedrooms };
