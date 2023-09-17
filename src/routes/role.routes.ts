import express from 'express';

import roleControllers from '~/controllers/role.controllers';
import validate from '~/middleware/validate.middleware';
import authorization from '~/middleware/authorization.middleware';
import { getRoleByIdSchema, deleteRoleByIdSchema } from '~/schema/role.schema';

const roleRouter = express.Router();

roleRouter.get('/', authorization.authenticated, authorization.adminRole, roleControllers.getAllRole);

roleRouter.get(
  '/:id',
  validate(getRoleByIdSchema),
  authorization.authenticated,
  authorization.adminRole,
  roleControllers.getRoleById,
);

roleRouter.delete(
  '/:id',
  validate(deleteRoleByIdSchema),
  authorization.authenticated,
  authorization.adminRole,
  roleControllers.deleteRole,
);

export default roleRouter;
