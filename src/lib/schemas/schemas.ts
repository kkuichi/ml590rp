import { z } from 'zod';

const SortableContainerSchema = z.object({
  id: z.string(),
  title: z.string(),
});

const SortableItemSchema = z.object({
  id: z.string(),
  containerId: z.string(),
  content: z.object({
    text: z.string(),
  }),
});

export const PostRetrospectiveSchema = z
  .object({
    title: z.string(),
    completed: z.boolean(),
    method: z.string(),
    data: z.object({
      containers: z.array(SortableContainerSchema),
      items: z.array(SortableItemSchema),
    }),
  })
  .strict();

export const PatchRetrospectiveSchema = z
  .object({
    title: z.string(),
    members: z.array(z.string().email()),
    supervisors: z.array(z.string().email()),
    interactive: z.boolean(),
    completed: z.boolean(),
    creationStage: z.number().int(),
    lastUpdate: z.date(),
    description: z.string(),
    data: z.object({
      containers: z.array(SortableContainerSchema),
      items: z.array(SortableItemSchema),
    }),
  })
  .partial()
  .strict()
  .refine((data) => Object.keys(data).length > 0, {
    message: 'Object cannot be empty',
  });

export const PatchCommentSchema = z
  .object({
    text: z.string().trim(),
  })
  .strict();

export const CredentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(16),
});
