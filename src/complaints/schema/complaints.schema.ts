import { z } from 'zod';

export const createComplaintsSchema = z.object({
  sender_id: z.number(),
  name: z.string(),
  address: z.string(),
  contact: z.string(),
  model: z.string(),
  message: z.string(),
  remarks: z.string().optional(),
  tag: z.string(),
  ticket_status: z.string(),
  concerns: z.string().optional(),
});
