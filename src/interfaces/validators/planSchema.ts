import z from "zod";
import { feeSchema } from "./feesSchema";

export const planSchema = z.object({
    name: z.string(),
    description: z.string(),
    startDate: z.coerce.date(),
    endDate: z.coerce.date(),
    volunteerNumber: z.number(),
    destinationId: z.string(),
    category_id: z.string(),
    fees: z.array(feeSchema)
})

export type PlanInput = z.infer<typeof planSchema>