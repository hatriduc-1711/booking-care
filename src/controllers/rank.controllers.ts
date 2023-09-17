import { Request, Response } from 'express';

import rankServices from '~/services/rank.services';
import log from '~/utils/logger.util';
import responseData from '~/utils/response-data.util';
import { ERROR_500, SUCCESS } from '~/constants/message.constants';
import { get } from 'lodash';
import { NOTFOUND } from 'dns';

const getAllRank = async (req: Request, res: Response) => {
  try {
    const data = await rankServices.getAllRank();
    return res.status(200).json(responseData(true, SUCCESS, data));
  } catch (err) {
    log.error(err);
    return res.status(500).json(responseData(false, ERROR_500));
  }
};

const getRank = async (req: Request, res: Response) => {
  try {
    const id = parseInt(get(req, 'params.id'));
    const rank = await rankServices.getRank(id);

    if (!rank) {
      return res.status(404).json(responseData(false, NOTFOUND));
    }

    return res.status(200).json(responseData(true, SUCCESS, rank));
  } catch (err) {
    log.error(err);
    return res.status(500).json(responseData(false, ERROR_500));
  }
};

export default { getAllRank, getRank };
