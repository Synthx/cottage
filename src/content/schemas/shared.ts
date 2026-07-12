import { z } from 'astro/zod';

export const linkSchema = z.object({
    href: z.string(),
    label: z.string(),
});

export type Link = z.infer<typeof linkSchema>;
