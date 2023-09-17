import express from 'express';

import techniqueControllers from '~/controllers/technique.controllers';
import validate from '~/middleware/validate.middleware';
import authorization from '~/middleware/authorization.middleware';
import { createTechniqueSchema, deleteTechniqueSchema, getTechniqueSchema } from '~/schema/technique.schema';

const techniqueRouter = express.Router();

techniqueRouter.post(
  '/',
  validate(createTechniqueSchema),
  authorization.authenticated,
  authorization.adminRole,
  techniqueControllers.createTechnique,
);

techniqueRouter.post('/', authorization.authenticated, techniqueControllers.getAllTechniques);

techniqueRouter.get(
  '/:id',
  validate(getTechniqueSchema),
  authorization.authenticated,
  techniqueControllers.getTechnique,
);

techniqueRouter.delete(
  '/:id',
  validate(deleteTechniqueSchema),
  authorization.authenticated,
  authorization.adminRole,
  techniqueControllers.deleteTechnique,
);

export default techniqueRouter;
