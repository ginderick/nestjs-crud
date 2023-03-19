import { z } from 'zod';

export const createComplaintsSchema = z.object({
  ticket_id: z.number(),
  sender_id: z.number(),
  address: z.string(),
  contact: z.string(),
  model: z.string(),
  remarks: z.string(),
  tag: z.string(),
  ticket_status: z.string(),
  concerns: z.string(),
});
