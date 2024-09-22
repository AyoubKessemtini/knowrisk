import { z } from 'zod';

export const homeScheme = z.object({
  username: z.string().regex(/^[^0-9]*$/),
});

export type HomeScheme = z.infer<typeof homeScheme>;
