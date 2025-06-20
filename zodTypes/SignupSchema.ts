import { z } from 'zod';

export const SignupSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/\d/, 'Password must contain at least one number')
    .regex(/[\W_]/, 'Password must contain at least one special character'),
});

export type SignupInput = z.infer<typeof SignupSchema>;
