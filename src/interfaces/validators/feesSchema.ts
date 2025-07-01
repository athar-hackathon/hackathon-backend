import z from "zod";

export const feeSchema = z.object({
    id: z.string().optional(),
    name: z.string(),
    fees: z.string(),
  });