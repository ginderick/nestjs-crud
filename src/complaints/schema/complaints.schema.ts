import * as Joi from 'joi';

export const createComplaintsSchema = Joi.object({
  ticket_id: Joi.string().required(),
});
