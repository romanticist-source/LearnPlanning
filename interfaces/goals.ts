import * as z from "zod";

export const goalsSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  deadline: z.string(),
  progress: z.number(),
  completed: z.boolean(),
  priority: z.enum(["low", "medium", "high"]),
  userId: z.number(),
  groupId: z.number(),
  createdAt: z.string(),
  subgoals: z.array(z.string()),
});

export const createGoalSchema = goalsSchema.omit({
  title: true,
  description: true,
  deadline: true,
  progress: true,
  createdAt: true,
  subgoals: true,
  priority: true,
  groupId: true,
});

export type CreateGoalInterface = z.infer<typeof createGoalSchema>;

export const updateGoalSchema = goalsSchema.omit({
  title: true,
  description: true,
  deadline: true,
  progress: true,
  createdAt: true,
  subgoals: true,
  priority: true,
});

export type UpdateGoalInterface = z.infer<typeof updateGoalSchema>;
