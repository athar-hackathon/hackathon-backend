import { z } from 'zod';

export const guestVolunteerFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100, "Name must be less than 100 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  age: z.number().min(16, "Age must be at least 16").max(100, "Age must be less than 100"),
  gender: z.enum(['MALE', 'FEMALE'], {
    errorMap: () => ({ message: "Gender must be either MALE or FEMALE" })
  }),
  country: z.string().min(2, "Country must be at least 2 characters").max(100, "Country must be less than 100 characters"),
  city: z.string().min(2, "City must be at least 2 characters").max(100, "City must be less than 100 characters"),
  planId: z.string().uuid("Invalid plan ID"),
  message: z.string().max(1000, "Message must be less than 1000 characters").optional(),
});

export type GuestVolunteerFormInput = z.infer<typeof guestVolunteerFormSchema>; 