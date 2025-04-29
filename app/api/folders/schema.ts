import { z } from "zod";

export const folderSchema = z.object({
    name: z.string().min(1, "Folder name is required"),
    description: z.string().optional(),
    color : z.string().optional(),
    isPublic: z.boolean().optional(),
    userId: z.string().optional(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
    shareUrl: z.string().optional(),
})
