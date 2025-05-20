import { z } from 'zod';

export const createProjectValidationSchema = z.object({
  title: z
    .string({
      required_error: 'Title is required!',
      invalid_type_error: 'Title must be string!',
    })
    .trim()
    .min(5, { message: 'Title must have minimum 5 characters!' })
    .max(65, { message: 'Title cannot exceed 65 characters!' }),

  description: z
    .string({
      required_error: 'Description is required!',
      invalid_type_error: 'Description must be string!',
    })
    .min(20, { message: 'Description must have minimum 20 characters!' })
    .trim(),

  features: z
    .string({
      required_error: 'Features is required!',
      invalid_type_error: 'Features must be string!',
    })
    .min(10, { message: 'Features must have minimum 10 characters!' })
    .trim(),

  stacks: z
    .string({
      required_error: 'Stack is required!',
      invalid_type_error: 'Stack must be string!',
    })
    .min(2, { message: 'Stack must have minimum 2 characters!' })
    .trim(),

  liveURL: z
    .string({
      required_error: 'Live-URL is required!',
      invalid_type_error: 'Live-URL must be a string!',
    })
    .min(10, { message: 'Live-URL must have minimum 10 characters!' })
    .trim(),

  frontEndGitHubURL: z
    .string({
      required_error: 'FrontEnd-GitHub-URL is required!',
      invalid_type_error: 'FrontEnd-GitHub-URL must be a string!',
    })
    .min(10, {
      message: 'FrontEnd-GitHub-URL must have minimum 10 characters!',
    })
    .trim(),

  backEndGitHubURL: z
    .string({
      required_error: 'BackEnd-GitHub-URL is required!',
      invalid_type_error: 'BackEnd-GitHub-URL must be a string!',
    })
    .min(10, {
      message: 'BackEnd-GitHub-URL must have minimum 10 characters!',
    })
    .trim(),

  image: z.custom<File>(file => file instanceof File, {
    message: 'Image is required!',
  }),
});

export const updateProjectValidationSchema = z.object({
  title: z
    .string({
      required_error: 'Title is required!',
      invalid_type_error: 'Title must be string!',
    })
    .trim()
    .min(5, { message: 'Title must have minimum 5 characters!' })
    .max(65, { message: 'Title cannot exceed 65 characters!' }),

  description: z
    .string({
      required_error: 'Description is required!',
      invalid_type_error: 'Description must be string!',
    })
    .min(20, { message: 'Description must have minimum 20 characters!' })
    .trim(),

  features: z
    .string({
      required_error: 'Features is required!',
      invalid_type_error: 'Features must be string!',
    })
    .min(10, { message: 'Features must have minimum 10 characters!' })
    .trim(),

  stacks: z
    .string({
      required_error: 'Stack is required!',
      invalid_type_error: 'Stack must be string!',
    })
    .min(2, { message: 'Stack must have minimum 2 characters!' })
    .trim(),

  liveURL: z
    .string({
      required_error: 'Live-URL is required!',
      invalid_type_error: 'Live-URL must be a string!',
    })
    .min(10, { message: 'Live-URL must have minimum 10 characters!' })
    .trim(),

  frontEndGitHubURL: z
    .string({
      required_error: 'FrontEnd-GitHub-URL is required!',
      invalid_type_error: 'FrontEnd-GitHub-URL must be a string!',
    })
    .min(10, {
      message: 'FrontEnd-GitHub-URL must have minimum 10 characters!',
    })
    .trim(),

  backEndGitHubURL: z
    .string({
      required_error: 'BackEnd-GitHub-URL is required!',
      invalid_type_error: 'BackEnd-GitHub-URL must be a string!',
    })
    .min(10, {
      message: 'BackEnd-GitHub-URL must have minimum 10 characters!',
    })
    .trim(),

  image: z
    .custom<File | undefined>(
      file => file === undefined || file instanceof File,
      {
        message: 'Invalid image file!',
      }
    )
    .optional(),
});
