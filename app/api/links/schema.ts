import { z } from 'zod';

export const linkSchema = z.object({
  url: z.string().url(),
  title: z.string().optional(),
  description: z.string().optional(),
  notes: z.string().optional(),
  folderId: z.string().optional(),
  tags: z.array(z.object({
    name: z.string(),
    color: z.string(),
  })), 
  isPublic: z.boolean().optional(),
});
