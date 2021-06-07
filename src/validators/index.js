import { object, string } from '@hapi/joi';

const minPwdLen = 6;
export const registerSchema = object({
  firstname: string().required(),
  lastname: string().required(),
  email: string().email().required(),
  password: string().min(minPwdLen).required(),
});

export const loginSchema = object({
  email: string().email().required(),
  password: string().min(minPwdLen).required()
});

export const createBookSchema = object({
  name: string().required(),
  author: string().required(),
  description: string()
});
export const updateBookSchema = createBookSchema;