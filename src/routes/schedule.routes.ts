import express from 'express';

import scheduleControllers from '~/controllers/schedule.controllers';
import validate from '~/middleware/validate.middleware';
import authorization from '~/middleware/authorization.middleware';
import {
  createScheduleSchema,
  deleteScheduleSchema,
  getScheduleSchema,
  getAllThePlansForTheDaySchema,
} from '~/schema/schedule.schema';

const scheduleRouter = express.Router();

scheduleRouter.post(
  '/',
  validate(createScheduleSchema),
  authorization.authenticated,
  scheduleControllers.createSchedule,
);

scheduleRouter.get(
  '/',
  validate(getAllThePlansForTheDaySchema),
  authorization.authenticated,
  scheduleControllers.getAllThePlansForTheDay,
);

scheduleRouter.delete(
  '/:id',
  validate(deleteScheduleSchema),
  authorization.authenticated,
  scheduleControllers.deleteSchedule,
);

scheduleRouter.get('/:id', validate(getScheduleSchema), authorization.authenticated, scheduleControllers.getSchedule);

export default scheduleRouter;
