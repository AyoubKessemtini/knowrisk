import { z } from 'zod';

export const passwordotpScheme = z.object({
  password: z.string().min(3),
});
const baseChangepasswordotpScheme = z.object({
  password: passwordotpScheme.shape.password,
  newPassword: passwordotpScheme.shape.password,
  confirmPassword: passwordotpScheme.shape.password,
});

export const changepasswordotpScheme = baseChangepasswordotpScheme.refine(
  (data) => data.newPassword === data.confirmPassword,
  {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  },
);

export const changeKnownpasswordotpScheme = baseChangepasswordotpScheme
  .extend({
    currentPassword: passwordotpScheme.shape.password,
  })
  .refine((data) => data.newPassword === data.confirmPassword);

export type ChangepasswordotpScheme = z.infer<typeof changepasswordotpScheme>;
export type ChangeKnownpasswordotpScheme = z.infer<
  typeof changeKnownpasswordotpScheme
>;
export type passwordotpScheme = z.infer<typeof passwordotpScheme>;
