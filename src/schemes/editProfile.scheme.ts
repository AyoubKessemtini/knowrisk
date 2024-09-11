import { z } from 'zod';

export const editProfileScheme = z.object({
  firstname: z.string().min(1, 'First name is required'),
  lastname: z.string().min(1, 'Last name is required'),
  birthDate: z.string().min(1, 'Birth date is required'),
  email: z.string().email('Invalid email address'),
  sex: z.string().min(1, 'Sex is required'),
  country: z.string().min(1, 'Country is required'),
  phoneNumber: z.string().min(1, 'Phone number is required'),
});

export type EditProfileScheme = z.infer<typeof editProfileScheme>;
