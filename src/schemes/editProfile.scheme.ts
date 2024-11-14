import { z } from 'zod';

export const editProfileScheme = z.object({
  firstname: z.string().nonempty('First name is required'),
  lastname: z.string().nonempty('Last name is required'),
  birthDate: z.string().nonempty('Birth date is required'),
  email: z.string().email('Invalid email format'),
  sex: z.string().nonempty('Gender is required'),
  phoneNumber: z.string().nonempty('Phone number is required'),
  bloodType: z.string().nonempty('Blood type is required'),

  height: z
    .number()
    .min(10, 'Height should be at least 50 cm')
    .max(250, 'Height should be no more than 250 cm'),
  weight: z
    .number()
    .min(10, 'Weight should be at least 20 kg')
    .max(200, 'Weight should be no more than 200 kg'),
});

export type EditProfileScheme = z.infer<typeof editProfileScheme>;
