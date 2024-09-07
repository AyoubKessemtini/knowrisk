import { z } from 'zod';

export const answersScheme = z.object({
  answer: z.string().min(1, 'Please fill this in'),
});

export type AnswersScheme = z.infer<typeof answersScheme>;
