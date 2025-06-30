import z from "zod";
import { associationSchema } from "./associationSchema";

export const userSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    name: z.string().min(1),
    age: z.number().min(18),
    gender: z.enum(["MALE", "FEMALE"]),
    country: z.string(),
    city: z.string(),
    profilePicture: z.string(),
    role: z.enum(["volunteer", "associationOwner"]),
    associationData: associationSchema.optional(),
})
export type CreateUserInput = z.infer<typeof userSchema>