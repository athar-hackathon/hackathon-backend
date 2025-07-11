import z from "zod";

export const associationSchema = z.object({
    id: z.string().optional(),
    name: z.string(),
    description: z.string(),
    image_url: z.string().optional(),
  });