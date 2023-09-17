import { Request, Response } from 'express';
import { get } from 'lodash';

import timeSlotServices from '~/services/time-slot.services';
import responseData from '~/utils/response-data.util';
import { ERROR_500, SUCCESS, NOT_FOUND } from '~/constants/message.constants';
import log from '~/utils/logger.util';

const createTimeSlot = async (req: Request, res: Response) => {
  try {
    const result = await timeSlotServices.createTimeSlot(req.body);
    if (!result) {
      return res.status(409).json(responseData(false, 'Time slot already exists !!!'));
    }
    return res.status(200).json(responseData(true, SUCCESS));
  } catch (err) {
    log.error(err);
    return res.status(500).json(responseData(false, ERROR_500));
  }
};

const deleteTimeSlot = async (req: Request, res: Response) => {
  try {
    const id = parseInt(get(req, 'params.id'));
    const result = await timeSlotServices.deleteTimeSlot(id);
    if (!result) {
      return res.status(404).json(responseData(false, NOT_FOUND));
    }
    return res.status(200).json(responseData(true, SUCCESS));
  } catch (err) {
    log.error(err);
    return res.status(500).json(responseData(false, ERROR_500));
  }
};

export default { createTimeSlot, deleteTimeSlot };
