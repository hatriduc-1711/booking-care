import express from 'express';

import validate from '~/middleware/validate.middleware';
import authorization from '~/middleware/authorization.middleware';
import clinicControllers from '~/controllers/clinic.controllers';
import {
  createClinicSchema,
  deleteClinicSchema,
  getClinicSchema,
  getAllClinicSchemas,
  editInfoSchema,
} from '~/schema/clinic.schema';

const clinicRouter = express.Router();

clinicRouter.post(
  '/',
  validate(createClinicSchema),
  authorization.authenticated,
  authorization.adminRole,
  clinicControllers.createClinic,
);

clinicRouter.get('/', validate(getAllClinicSchemas), authorization.authenticated, clinicControllers.getAllClinic);

clinicRouter.delete(
  '/:id',
  validate(deleteClinicSchema),
  authorization.authenticated,
  authorization.adminRole,
  clinicControllers.deleteClinic,
);

clinicRouter.get('/:id', validate(getClinicSchema), authorization.authenticated, clinicControllers.getClinic);

clinicRouter.put(
  '/:id',
  validate(editInfoSchema),
  authorization.authenticated,
  authorization.adminRole,
  clinicControllers.editInfo,
);

export default clinicRouter;
