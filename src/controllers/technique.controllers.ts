import { Request, Response } from 'express';

import techniqueServices from '~/services/technique.services';
import responseData from '~/utils/response-data.util';
import log from '~/utils/logger.util';
import { ERROR_500, SUCCESS } from '~/constants/message.constants';
import { get } from 'lodash';
import { NOTFOUND } from 'dns';

const createTechnique = async (req: Request, res: Response) => {
  try {
    const result = await techniqueServices.createTechnique(req.body);
    if (!result) {
      return res.status(409).json(responseData(false, 'Technique already exists !!!'));
    }
    return res.status(200).json(responseData(false, SUCCESS));
  } catch (err) {
    log.error(err);
    return res.status(500).json(responseData(false, ERROR_500));
  }
};

const getAllTechniques = async (req: Request, res: Response) => {
  try {
    const data = await techniqueServices.getAllTechniques();
    return res.status(200).json(responseData(false, SUCCESS, data));
  } catch (err) {
    log.error(err);
    return res.status(500).json(responseData(false, ERROR_500));
  }
};

const getTechnique = async (req: Request, res: Response) => {
  try {
    const id = parseInt(get(req, 'params.id'));
    const data = await techniqueServices.getTechnique(id);
    if (!data) {
      return res.status(404).json(responseData(false, NOTFOUND));
    }
    return res.status(200).json(responseData(false, SUCCESS, data));
  } catch (err) {
    log.error(err);
    return res.status(500).json(responseData(false, ERROR_500));
  }
};

const deleteTechnique = async (req: Request, res: Response) => {
  try {
    const id = parseInt(get(req, 'params.id'));
    const result = await techniqueServices.deleteTechnique(id);
    if (!result) {
      return res.status(404).json(responseData(false, NOTFOUND));
    }
    return res.status(200).json(responseData(false, SUCCESS));
  } catch (err) {
    log.error(err);
    return res.status(500).json(responseData(false, ERROR_500));
  }
};

export default { createTechnique, getAllTechniques, getTechnique, deleteTechnique };
