import express from 'express';

import historyControllers from '~/controllers/history.controllers';
import validate from '~/middleware/validate.middleware';
import authorization from '~/middleware/authorization.middleware';
import { getHistorySchema, deleteHistorySchema } from '~/schema/history.schema';

const historyRouter = express.Router();

historyRouter.get(
  '/:patientId',
  validate(getHistorySchema),
  authorization.authenticated,
  authorization.userRole,
  historyControllers.getHistory,
);

historyRouter.delete(
  '/:id',
  validate(deleteHistorySchema),
  authorization.authenticated,
  authorization.userRole,
  historyControllers.deleteHistory,
);

export default historyRouter;
