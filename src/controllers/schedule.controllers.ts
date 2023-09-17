import { Request, Response } from 'express';

import scheduleServices from '~/services/schedule.services';
import responseData from '~/utils/response-data.util';
import log from '~/utils/logger.util';
import { ERROR_500, SUCCESS, NOT_FOUND } from '~/constants/message.constants';
import { get } from 'lodash';

const createSchedule = async (req: Request, res: Response) => {
  try {
    const result = await scheduleServices.createSchedule(req.body);

    if (result === 1) {
      return res.status(409).json(responseData(false, 'Invalid date'));
    }

    if (result === 2) {
      return res.status(409).json(responseData(false, 'Schedule already exists'));
    }

    return res.status(200).json(responseData(true, SUCCESS));
  } catch (err) {
    log.error(err);
    return res.status(500).json(responseData(false, ERROR_500));
  }
};

const getAllThePlansForTheDay = async (req: Request, res: Response) => {
  try {
    const doctorId = parseInt(req.query.doctorId as string);
    const date = req.query.date as string;
    const data = await scheduleServices.getAllThePlansForTheDay(doctorId, date);
    if (!data) {
      return res.status(409).json(responseData(false, 'Invalid date'));
    }
    return res.status(200).json(responseData(true, SUCCESS, data));
  } catch (err) {
    log.error(err);
    return res.status(500).json(responseData(false, ERROR_500));
  }
};

const deleteSchedule = async (req: Request, res: Response) => {
  try {
    const id = parseInt(get(req, 'params.id'));
    const result = await scheduleServices.deleteSchedule(id);
    if (!result) {
      return res.status(404).json(responseData(false, NOT_FOUND));
    }
    return res.status(200).json(responseData(true, SUCCESS));
  } catch (err) {
    log.error(err);
    return res.status(500).json(responseData(false, ERROR_500));
  }
};

const getSchedule = async (req: Request, res: Response) => {
  try {
    const id = parseInt(get(req, 'params.id'));
    const data = await scheduleServices.getSchedule(id);
    if (!data) {
      return res.status(404).json(responseData(false, NOT_FOUND));
    }
    return res.status(200).json(responseData(true, SUCCESS));
  } catch (err) {
    log.error(err);
    return res.status(500).json(responseData(false, ERROR_500));
  }
};

export default { createSchedule, getAllThePlansForTheDay, deleteSchedule, getSchedule };
