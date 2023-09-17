import { Request, Response } from 'express';
import { get } from 'lodash';

import clinicServices from '~/services/clinic.services';
import responseData from '~/utils/response-data.util';
import { ERROR_500, SUCCESS, NOT_FOUND } from '~/constants/message.constants';
import log from '~/utils/logger.util';

const createClinic = async (req: Request, res: Response) => {
  try {
    const result = await clinicServices.createClinic(req.body);

    if (!result) {
      return res.status(409).json(responseData(false, 'Address already exists !!!'));
    }

    return res.status(200).json(responseData(true, SUCCESS));
  } catch (err) {
    log.error(err);
    return res.status(500).json(responseData(false, ERROR_500));
  }
};

const deleteClinic = async (req: Request, res: Response) => {
  try {
    const id = parseInt(get(req, 'params.id'));
    const result = await clinicServices.deleteClinic(id);

    if (!result) {
      return res.status(404).json(responseData(false, NOT_FOUND));
    }

    return res.status(200).json(responseData(true, SUCCESS));
  } catch (err) {
    log.error(err);
    return res.status(500).json(responseData(false, ERROR_500));
  }
};

const getClinic = async (req: Request, res: Response) => {
  try {
    const id = parseInt(get(req, 'params.id'));
    const data = await clinicServices.getClinic(id);

    if (!data) {
      return res.status(404).json(responseData(false, NOT_FOUND));
    }

    return res.status(200).json(responseData(true, SUCCESS, data));
  } catch (err) {
    log.error(err);
    return res.status(500).json(responseData(false, ERROR_500));
  }
};

const getAllClinic = async (req: Request, res: Response) => {
  try {
    const { page, limit } = req.query;
    const data = await clinicServices.getAllClinic(page as string, limit as string);
    return res.status(200).json(responseData(true, SUCCESS, data));
  } catch (err) {
    log.error(err);
    return res.status(500).json(responseData(false, ERROR_500));
  }
};

const editInfo = async (req: Request, res: Response) => {
  try {
    const id = parseInt(get(req, 'params.id'));
    const result = await clinicServices.editInfo(req.body, id);
    if (!result) {
      return res.status(409).json(responseData(false, 'Address already exists !!!'));
    }
    return res.status(200).json(responseData(true, SUCCESS));
  } catch (err) {
    log.error(err);
    return res.status(500).json(responseData(false, ERROR_500));
  }
};

export default { createClinic, deleteClinic, getClinic, getAllClinic, editInfo };
