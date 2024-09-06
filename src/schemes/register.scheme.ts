import { z } from 'zod';

export const registerScheme = z.object({
  firstname: z.string().min(1, 'First name is required'),
  lastname: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phoneNumber: z.string().min(1, 'Phone number is required'),
  medicalEntity: z.string().min(1, 'Medical entity is required'),
  referenceMedicalAssociationId: z.string().min(1, 'Reference ID is required'),
  isHospitalOrClinic: z.boolean(),
  hospitalClinicName: z.string().optional(),
});

export type RegisterScheme = z.infer<typeof registerScheme>;
