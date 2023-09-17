import express from 'express';

import validate from '~/middleware/validate.middleware';
import authorization from '~/middleware/authorization.middleware';
import doctorControllers from '~/controllers/doctor.controllers';
import { createDoctorSchema, getAllDoctorSchema, getDoctorSchema, updateInfoSchema } from '~/schema/doctor.schema';

const doctorRouter = express.Router();

doctorRouter.post(
  '/',
  validate(createDoctorSchema),
  authorization.authenticated,
  authorization.adminRole,
  doctorControllers.createDoctor,
);

doctorRouter.get('/', validate(getAllDoctorSchema), authorization.authenticated, doctorControllers.getAllDoctor);
doctorRouter.get('/detail', authorization.authenticated, authorization.doctorRole, doctorControllers.doctorDetails);
doctorRouter.get('/:id', validate(getDoctorSchema), authorization.authenticated, doctorControllers.getDoctor);

doctorRouter.put(
  '/',
  validate(updateInfoSchema),
  authorization.authenticated,
  authorization.doctorRole,
  doctorControllers.updateInfo,
);

doctorRouter.delete(
  '/:id',
  validate(getDoctorSchema),
  authorization.authenticated,
  authorization.adminRole,
  doctorControllers.getDoctor,
);

export default doctorRouter;
