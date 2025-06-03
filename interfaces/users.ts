import { z } from "zod";

export const usersSchema = z.object({
  id: z.string(),
  name: z
    .string()
    .min(1)
    .max(150)
    .regex(/^[\w.@+-]+$/),
  email: z.string().email(),
  password: z.string(),
  role: z.enum(["student", "teacher", "admin"]),
  createdAt: z.string(),
});

export const createUserSchema = usersSchema.omit({
  name: true,
  email: true,
  password: true,
  role: true,
});

export type CureateUserInterface = z.infer<typeof createUserSchema>;

export const updateUserSchema = usersSchema.omit({
  name: true,
  email: true,
  password: true,
  role: true,
});

export type updateUserInterface = z.infer<typeof updateUserSchema>;
