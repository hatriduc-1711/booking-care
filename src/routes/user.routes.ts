import express from 'express';

import userControllers from '~/controllers/user.controllers';
import validate from '~/middleware/validate.middleware';
import authorization from '~/middleware/authorization.middleware';
import { deleteUserSchema, editInfoSchema, getAllUsersSchema, getUserSchema } from '~/schema/user.schema';

const userRouter = express.Router();

userRouter.get(
  '/',
  validate(getAllUsersSchema),
  authorization.authenticated,
  authorization.adminRole,
  userControllers.getAllUsers,
);

userRouter.get('/detail', authorization.authenticated, authorization.userRole, userControllers.userDetails);

userRouter.put(
  '/',
  validate(editInfoSchema),
  authorization.authenticated,
  authorization.userRole,
  userControllers.editInfo,
);

userRouter.get('/:id', validate(getUserSchema), authorization.authenticated, userControllers.getUser);

userRouter.delete(
  '/:id',
  validate(deleteUserSchema),
  authorization.authenticated,
  authorization.adminRole,
  userControllers.deleteUser,
);

userRouter.delete(
  '/remove-account',
  authorization.authenticated,
  authorization.userRole,
  userControllers.removeAccount,
);

export default userRouter;
