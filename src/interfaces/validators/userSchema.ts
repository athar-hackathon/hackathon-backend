import z from "zod";

export const userSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    name: z.string().min(1),
    age: z.number().min(18),
    gender: z.enum(["MALE", "FEMALE"]),
    country: z.string(),
    city: z.string(),
    profilePicture: z.string(),
})

export type CreateUserInput = z.infer<typeof userSchema>