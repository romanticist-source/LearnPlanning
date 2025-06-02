import { z } from "zod";

export const contributionDataSchema = z.object({
  id: z.string(),
  userId: z.string(),
  date: z.string(),
  activityLevel: z.number(),
  studyTime: z.number(),
  tasksCompleted: z.number(),
  paizaActivities: z.number(),
});

export const createContributionDataSchema = contributionDataSchema.omit({
  id: true,
});

export type CreateContributionDataInterface = z.infer<
  typeof createContributionDataSchema
>;

export const updateContributionDataSchema = contributionDataSchema.omit({
  activityLevel: true,
  studyTime: true,
  tasksCompleted: true,
  paizaActivities: true,
});

export type UpdateContributionDataInterface = z.infer<
  typeof updateContributionDataSchema
>;
