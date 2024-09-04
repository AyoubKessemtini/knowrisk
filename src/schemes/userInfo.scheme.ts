import { z } from 'zod';

export const userInfoScheme = z.object({
  firstname: z.string().min(1),
  lastname: z.string().min(1),
});

export type UserInfoScheme = z.infer<typeof userInfoScheme>;
