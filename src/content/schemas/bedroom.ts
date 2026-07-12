import { z } from 'astro/zod';

export const bedroomSchema = z.object({
    name: z.string(),
    order: z.number(),
    capacity: z.number(),
    surface: z.number(),
    bed: z.string(),
    price: z.number(),
});

export type Bedroom = z.infer<typeof bedroomSchema>;
