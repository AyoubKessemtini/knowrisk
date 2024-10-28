import { z } from 'zod';
import { passwordScheme } from './password.scheme';
import { DeviceType } from '@constants/DeviceTypes';

export const registerScheme = z
  .object({
    firstname: z.string().min(1, 'First name is required'),
    lastname: z.string().min(1, 'Last name is required'),
    email: z.string().email('Invalid email address'),
    phoneNumber: z.string().min(1, 'Phone number is required'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string().min(8, 'Confirm password is required'),
    device_type: z.nativeEnum(DeviceType).refine((value) => value !== '', {
      message: 'Please select a device type',
    }), // Ensures device_type is selected and valid
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export type RegisterScheme = z.infer<typeof registerScheme>;
