import { z } from "zod";

export const eventSchema = z.object({
  id: z.string(),
  title: z.string().min(1).max(255),
  description: z.string(),
  date: z.string(),
  startTime: z.string(),
  endTime: z.string(),
  type: z.enum(["meeting", "event"]),
  groupId: z.string(),
  createdBy: z.string(),
  attendees: z.array(z.string()),
  createdAt: z.string(),
});

export const createEventSchema = eventSchema.omit({
  title: true,
  description: true,
  date: true,
  startTime: true,
  endTime: true,
  type: true,
  groupId: true,
  createdBy: true,
  attendees: true,
});

export type CreateEventInterface = z.infer<typeof createEventSchema>;

export const updateEventSchema = eventSchema.omit({
  title: true,
  description: true,
  date: true,
  startTime: true,
  endTime: true,
  type: true,
  groupId: true,
  attendees: true,
});

export type UpdateEventInterface = z.infer<typeof updateEventSchema>;
