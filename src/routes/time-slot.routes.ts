import express from 'express';

import timeSlotControllers from '~/controllers/time-slot.controllers';
import validate from '~/middleware/validate.middleware';
import authorization from '~/middleware/authorization.middleware';
import { createTimeSlotSchema, deleteTimeSlotSchema } from '~/schema/time-slot.schema';

const timeSlotRouter = express.Router();

timeSlotRouter.post(
  '/',
  validate(createTimeSlotSchema),
  authorization.authenticated,
  authorization.adminRole,
  timeSlotControllers.createTimeSlot,
);

timeSlotRouter.delete(
  '/:id',
  validate(deleteTimeSlotSchema),
  authorization.authenticated,
  authorization.adminRole,
  timeSlotControllers.deleteTimeSlot,
);

export default timeSlotRouter;
