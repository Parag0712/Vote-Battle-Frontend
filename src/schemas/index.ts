import { z } from "zod";

export const LoginFormSchema = z.object({
    email: z.string().email('Email is invalid'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .max(16, 'Password must be less than 16 characters'),
});
