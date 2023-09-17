import { Request, Response } from 'express';

import historyServices from '~/services/history.services';
import responseData from '~/utils/response-data.util';
import log from '~/utils/logger.util';
import { ERROR_500, SUCCESS, NOT_FOUND } from '~/constants/message.constants';
import { get } from 'lodash';

const getHistory = async (req: Request, res: Response) => {
  try {
    const patientId = parseInt(get(req, 'params.patientId'));
    const data = await historyServices.getHistory(patientId);
    return res.status(200).json(responseData(true, SUCCESS, data));
  } catch (err) {
    log.error(err);
    return res.status(500).json(responseData(false, ERROR_500));
  }
};

const deleteHistory = async (req: Request, res: Response) => {
  try {
    const id = parseInt(get(req, 'params.id'));
    const result = await historyServices.deleteHistory(id);
    if (!result) {
      return res.status(404).json(responseData(false, NOT_FOUND));
    }
    return res.status(200).json(responseData(true, SUCCESS));
  } catch (err) {
    log.error(err);
    return res.status(500).json(responseData(false, ERROR_500));
  }
};

export default { getHistory, deleteHistory };
