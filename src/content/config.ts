import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    tech: z.array(z.string()),
    featuredImage: z.string().optional(),
    github: z.string().url().optional(),
    liveUrl: z.string().url().optional(),
    featured: z.boolean().default(false),
  }),
});

export const collections = {
  projects,
};
