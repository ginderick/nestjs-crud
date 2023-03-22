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

export const complaintsTagSchema = z.object({
  tag: z.string(),
});

export const complaintsStatusSchema = z.object({
  ticket_status: z.string(),
  remarks: z.string().optional(),
});

export const dateSchema = z.preprocess((arg) => {
  if (typeof arg == 'string' || arg instanceof Date) return new Date(arg);
}, z.date());
