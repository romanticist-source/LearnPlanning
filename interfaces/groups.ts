import { z } from "zod";

export const groupSchema = z.object({
  id: z.string(),
  name: z.string().min(1).max(255),
  description: z.string(),
  imageUrl: z.string(),
  createdAt: z.string(),
  createdBy: z.string(),
  members: z.array(z.string()),
  tags: z.array(z.string()),
  meetingSchedule: z.string(),
  isPublic: z.boolean(),
});

export const createGroupSchema = groupSchema.omit({
  id: true,
  createdAt: true,
  createdBy: true,
});

export type CreateGroupInterface = z.infer<typeof createGroupSchema>;
