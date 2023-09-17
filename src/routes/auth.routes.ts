import express from 'express';
import authControllers from '~/controllers/auth.controllers';
import validate from '~/middleware/validate.middleware';
import authorization from '~/middleware/authorization.middleware';
import {
  signUpSchema,
  signInSchema,
  changePasswordSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} from '~/schema/auth.schema';

const authRouter = express.Router();

authRouter.post('/sign-up', validate(signUpSchema), authControllers.signUp);
authRouter.post('/sign-in', validate(signInSchema), authControllers.signIn);
authRouter.post('/logout', authorization.authenticated, authControllers.logout);
authRouter.post('/forgot-password', validate(forgotPasswordSchema), authControllers.forgotPassword);
authRouter.put('/reset-password', validate(resetPasswordSchema), authControllers.resetPassword);
authRouter.put(
  '/change-password',
  validate(changePasswordSchema),
  authorization.authenticated,
  authControllers.changePassword,
);

export default authRouter;
