import { z } from 'zod';

export const blogPostValidationSchema = z.object({
  title: z
    .string({
      required_error: 'Title is required!',
      invalid_type_error: 'Title must be string!',
    })
    .trim()
    .min(15, { message: 'Title must have minimum 15 characters!' })
    .max(80, { message: 'Title cannot exceed 80 characters!' }),

  content: z
    .string({
      required_error: 'Content is required!',
      invalid_type_error: 'Content must be string!',
    })
    .min(20, { message: 'Content must have minimum 20 characters!' })
    .trim(),

  url: z
    .string({
      required_error: 'URL is required!',
      invalid_type_error: 'URL must be a string!',
    })
    .min(20, { message: 'URL must have minimum 20 characters!' })
    .trim(),
});
