import { z } from 'zod';

export const usernameScheme = z.object({
  username: z.string().min(1),
});

export type UsernameScheme = z.infer<typeof usernameScheme>;
