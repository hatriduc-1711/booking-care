import { Request, Response } from 'express';
import { omit } from 'lodash';

import authServices from '~/services/auth.services';
import responseData from '~/utils/response-data.util';
import { ERROR_500, SUCCESS, NOT_FOUND } from '~/constants/message.constants';
import log from '~/utils/logger.util';

const signUp = async (req: Request, res: Response) => {
  try {
    const payload = omit(req.body, 'passwordConfirmation');
    const result = await authServices.signUp(payload);
    if (!result) {
      return res.status(409).json(responseData(false, 'Email already exists !!!'));
    }
    return res.status(200).json(responseData(true, SUCCESS));
  } catch {
    return res.status(500).json(responseData(false, ERROR_500));
  }
};

const signIn = async (req: Request, res: Response) => {
  try {
    const { email, password, role } = req.body;
    const result = await authServices.signIn(email, password, role);
    if (!result) {
      return res.status(404).json(responseData(false, 'Incorrect Email, Password, Role. Please try again!'));
    }
    const data = { token: result };
    return res.status(200).json(responseData(true, SUCCESS, data));
  } catch (err) {
    log.error(err);
    return res.status(500).json(responseData(false, ERROR_500));
  }
};

const logout = async (req: Request, res: Response) => {
  try {
    return res.status(200).json(responseData(true, SUCCESS));
  } catch {
    return res.status(500).json(responseData(false, ERROR_500));
  }
};

const changePassword = async (req: Request, res: Response) => {
  try {
    const email = res.locals.email;
    const role = res.locals.role?.key;
    const newPassword = req.body.newPassword;
    const result = await authServices.changePassword(newPassword, email, role);
    if (!result) {
      return res.status(404).json(responseData(false, 'Email already exists !!!'));
    }
    return res.status(200).json(responseData(true, SUCCESS));
  } catch {
    return res.status(500).json(responseData(false, ERROR_500));
  }
};

const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email, role } = req.body;
    const result = await authServices.forgotPassword(email, role);
    if (!result) {
      return res.status(404).json(responseData(false, NOT_FOUND));
    }
    return res.status(200).json(responseData(true, SUCCESS));
  } catch (err) {
    log.error(err);
    return res.status(500).json(responseData(false, ERROR_500));
  }
};

const resetPassword = async (req: Request, res: Response) => {
  try {
    const { email, token, newPassword, role } = req.body;
    const result = await authServices.resetPassword(email, token, newPassword, role);
    if (!result) {
      return res.status(404).json(responseData(false, NOT_FOUND));
    }
    return res.status(200).json(responseData(true, SUCCESS));
  } catch (err) {
    log.error(err);
    return res.status(500).json(responseData(false, ERROR_500));
  }
};

export default { signUp, signIn, changePassword, forgotPassword, resetPassword, logout };
