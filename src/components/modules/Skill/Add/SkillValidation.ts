import { z } from 'zod';

export const skillValidationSchema = z.object({
  name: z
    .string({
      required_error: 'Name is required!',
      invalid_type_error: 'Name must be string!',
    })
    .trim()
    .min(2, { message: 'Name must have minimum 2 characters!' })
    .max(100, { message: 'Name cannot exceed 100 characters!' }),

  icon: z
    .string({
      required_error: 'Icon is required!',
      invalid_type_error: 'Icon must be string!',
    })
    .trim()
    .min(2, { message: 'Icon must have minimum 2 characters!' })
    .max(50, { message: 'Icon cannot exceed 50 characters!' }),
});
