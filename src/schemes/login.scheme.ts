import { z } from 'zod';

export const loginScheme = z.object({
  email: z.string().min(1).email(),
  password: z.string().min(8),
});

export type LoginScheme = z.infer<typeof loginScheme>;
