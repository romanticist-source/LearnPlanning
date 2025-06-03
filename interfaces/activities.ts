import { z } from "zod";

export const activitySchema = z.object({
  id: z.string(),
  userId: z.string(),
  type: z.enum([
    "goal_created",
    "goal_updated",
    "goal_deleted",
    "reminder_created",
    "reminder_updated",
    "reminder_deleted",
    "event_created",
    "event_updated",
    "event_deleted",
  ]),
  entityId: z.string(),
  groupId: z.string(),
  description: z.string(),
  createdAt: z.string(),
});

export const createActivitySchema = activitySchema.omit({
  id: true,
  createdAt: true,
});

export type CreateActivityInterface = z.infer<typeof createActivitySchema>;

export const updateActivitySchema = activitySchema.omit({
  description: true,
});

export type UpdateActivityInterface = z.infer<typeof updateActivitySchema>;
