import { z } from "zod";

export const reminderSchema = z.object({
  id: z.string(),
  title: z.string().min(1).max(255),
  description: z.string(),
  date: z.string(),
  time: z.string(),
  completed: z.boolean(),
  userId: z.string(),
  goalId: z.string(),
  createdAt: z.string(),
});

export const createReminderSchema = reminderSchema.omit({
  title: true,
  description: true,
  date: true,
  time: true,
  completed: true,
  userId: true,
  goalId: true,
});

export type CreateReminderInterface = z.infer<typeof createReminderSchema>;

export const updateReminderSchema = reminderSchema.omit({
  title: true,
  description: true,
  date: true,
  time: true,
  completed: true,
});

export type UpdateReminderInterface = z.infer<typeof updateReminderSchema>;
