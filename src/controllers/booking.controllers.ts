import { Request, Response } from 'express';

import bookingServices from '~/services/booking.services';
import responseData from '~/utils/response-data.util';
import log from '~/utils/logger.util';
import { ERROR_500, SUCCESS, NOT_FOUND } from '~/constants/message.constants';
import { get } from 'lodash';

const userBooking = async (req: Request, res: Response) => {
  try {
    const result = await bookingServices.userBooking(req.body);
    if (result === 1) {
      return res.status(409).json(responseData(false, 'Invalid date'));
    }
    if (result === 2) {
      return res.status(409).json(responseData(false, 'The number of reservations is full'));
    }
    if (result === 3) {
      return res.status(409).json(responseData(false, 'Booking already exists'));
    }
    return res.status(200).json(responseData(true, SUCCESS));
  } catch (err) {
    log.error(err);
    return res.status(500).json(responseData(false, ERROR_500));
  }
};

const getBooking = async (req: Request, res: Response) => {
  try {
    const date = req.query.date as string;
    const doctorId = req.query.doctorId as string;
    const result = await bookingServices.getBooking(parseInt(doctorId), date);
    if (!result) {
      return res.status(409).json(responseData(false, 'Invalid date'));
    }
    return res.status(200).json(responseData(true, SUCCESS, result));
  } catch (err) {
    log.error(err);
    return res.status(500).json(responseData(false, ERROR_500));
  }
};

const cancelBooking = async (req: Request, res: Response) => {
  try {
    const id = parseInt(get(req, 'params.id'));
    const result = await bookingServices.cancelBooking(id);
    if (!result) {
      return res.status(404).json(responseData(false, NOT_FOUND));
    }
    return res.status(200).json(responseData(true, SUCCESS));
  } catch (err) {
    log.error(err);
    return res.status(500).json(responseData(false, ERROR_500));
  }
};

const completeBooking = async (req: Request, res: Response) => {
  try {
    const id = parseInt(get(req, 'params.id'));
    const result = await bookingServices.cancelBooking(id);
    if (!result) {
      return res.status(404).json(responseData(false, NOT_FOUND));
    }
    return res.status(200).json(responseData(true, SUCCESS));
  } catch (err) {
    log.error(err);
    return res.status(500).json(responseData(false, ERROR_500));
  }
};

export default { userBooking, getBooking, cancelBooking, completeBooking };
