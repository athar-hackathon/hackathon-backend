import z from "zod";

export const feeSchema = z.object({
    id: z.string(),
    name: z.string(),
    fees: z.string(),
  });