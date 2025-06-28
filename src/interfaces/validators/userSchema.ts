import z from "zod";

export const userSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    name: z.string().min(1)
})

export type CreateUserInput = z.infer<typeof userSchema>