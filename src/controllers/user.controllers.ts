import { Request, Response } from 'express';
import { get } from 'lodash';

import userServices from '~/services/user.services';
import responseData from '~/utils/response-data.util';
import log from '~/utils/logger.util';
import { ERROR_500, SUCCESS, NOT_FOUND } from '~/constants/message.constants';

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const { page, limit } = req.query;
    const data = userServices.getAllUsers(page as string, limit as string);
    return res.status(200).json(responseData(true, SUCCESS, data));
  } catch (err) {
    log.error(err);
    return res.status(500).json(responseData(false, ERROR_500));
  }
};

const getUser = async (req: Request, res: Response) => {
  try {
    const id = parseInt(get(req, 'params.id'));
    const data = await userServices.getUser(id);
    if (!data) {
      return res.status(404).json(responseData(false, NOT_FOUND));
    }
    return res.status(200).json(responseData(true, SUCCESS, data));
  } catch (err) {
    log.error(err);
    return res.status(500).json(responseData(false, ERROR_500));
  }
};

const userDetails = async (req: Request, res: Response) => {
  try {
    const email = res.locals.email;
    const user = await userServices.userDetails(email);
    if (!user) {
      return res.status(404).json(responseData(false, NOT_FOUND));
    }
    return res.status(200).json(responseData(true, SUCCESS, user));
  } catch (err) {
    log.error(err);
    return res.status(500).json(responseData(false, ERROR_500));
  }
};

const editInfo = async (req: Request, res: Response) => {
  try {
    const email = res.locals.email;
    const result = await userServices.editInfo(req.body, email);
    if (!result) {
      return res.status(409).json(responseData(false, 'Email already exists !!!'));
    }
    return res.status(200).json(responseData(true, SUCCESS));
  } catch (err) {
    log.error(err);
    return res.status(500).json(responseData(false, ERROR_500));
  }
};

const removeAccount = async (req: Request, res: Response) => {
  try {
    const email = res.locals.email;
    const result = await userServices.removeAccount(email);
    if (!result) {
      return res.status(404).json(responseData(false, NOT_FOUND));
    }
    return res.status(200).json(responseData(true, SUCCESS));
  } catch (err) {
    log.error(err);
    return res.status(500).json(responseData(false, ERROR_500));
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = parseInt(get(req, 'params.id'));
    const data = await userServices.deleteUser(id);
    if (!data) {
      return res.status(404).json(responseData(false, NOT_FOUND));
    }
    return res.status(200).json(responseData(true, SUCCESS, data));
  } catch (err) {
    log.error(err);
    return res.status(500).json(responseData(false, ERROR_500));
  }
};

export default { getAllUsers, getUser, userDetails, editInfo, removeAccount, deleteUser };
