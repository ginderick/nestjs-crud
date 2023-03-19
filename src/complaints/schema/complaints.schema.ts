import { z } from 'zod';

export const createComplaintsSchema = z.object({
  sender_id: z.number(),
  contact: z.string(),
  address: z.string(),
  model: z.string(),
  remarks: z.string(),
  tag: z.string(),
  ticket_status: z.string(),
  concerns: z.string(),
});
