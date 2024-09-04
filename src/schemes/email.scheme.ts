import { z } from 'zod';

export const emailScheme = z.object({
  email: z.string().min(1).email(),
});

export type EmailScheme = z.infer<typeof emailScheme>;
