import { Request, Response } from 'express';
import { get } from 'lodash';

import roleServices from '~/services/role.services';
import responseData from '~/utils/response-data.util';
import { ERROR_500, SUCCESS, NOT_FOUND } from '~/constants/message.constants';
import log from '~/utils/logger.util';

const getAllRole = async (_: any, res: Response) => {
  try {
    const data = await roleServices.getAllRole();
    return res.status(200).json(responseData(true, SUCCESS, data));
  } catch {
    return res.status(500).json(responseData(false, ERROR_500));
  }
};

const getRoleById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(get(req, 'params.id'));
    const data = await roleServices.getRoleById(id);

    if (!data) {
      return res.status(404).json(responseData(false, NOT_FOUND));
    }

    return res.status(200).json(responseData(true, SUCCESS, data));
  } catch {
    return res.status(500).json(responseData(false, ERROR_500));
  }
};

const deleteRole = async (req: Request, res: Response) => {
  try {
    const id = parseInt(get(req, 'params.id'));
    const result = await roleServices.deleteRole(id);

    if (!result) {
      return res.status(404).json(responseData(false, NOT_FOUND));
    }

    return res.status(200).json(responseData(true, SUCCESS));
  } catch {
    return res.status(500).json(responseData(false, ERROR_500));
  }
};

export default { getAllRole, getRoleById, deleteRole };
