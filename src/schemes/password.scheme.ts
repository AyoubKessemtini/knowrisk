import { z } from 'zod';

export const passwordScheme = z.object({
  password: z.string().min(8),
});
const baseChangePasswordScheme = z.object({
  newPassword: passwordScheme.shape.password,
  confirmPassword: passwordScheme.shape.password,
});

export const changePasswordScheme = baseChangePasswordScheme.refine(
  (data) => data.newPassword === data.confirmPassword,
  {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  },
);

export const changeKnownPasswordScheme = baseChangePasswordScheme
  .extend({
    currentPassword: passwordScheme.shape.password,
  })
  .refine((data) => data.newPassword === data.confirmPassword);

export type ChangePasswordScheme = z.infer<typeof changePasswordScheme>;
export type ChangeKnownPasswordScheme = z.infer<
  typeof changeKnownPasswordScheme
>;
export type PasswordScheme = z.infer<typeof passwordScheme>;
