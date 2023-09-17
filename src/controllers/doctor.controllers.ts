import { Request, Response } from 'express';
import { get, omit } from 'lodash';

import doctorServices from '~/services/doctor.services';
import responseData from '~/utils/response-data.util';
import log from '~/utils/logger.util';
import { ERROR_500, SUCCESS, NOT_FOUND } from '~/constants/message.constants';

const createDoctor = async (req: Request, res: Response) => {
  try {
    const payload = omit(req.body, 'passwordConfirmation');
    const result = await doctorServices.createDoctor(payload);

    if (result === 1) {
      return res.status(409).json(responseData(false, 'Email already exists !!!'));
    }

    if (result === 2) {
      return res.status(400).json(responseData(false, 'Rank, Clinic, Technique do not exists. Please try again!'));
    }

    return res.status(200).json(responseData(true, SUCCESS));
  } catch (err) {
    log.error(err);
    return res.status(500).json(responseData(false, ERROR_500));
  }
};

const getAllDoctor = async (req: Request, res: Response) => {
  try {
    const { page, limit } = req.query;
    const data = await doctorServices.getAllDoctor(page as string, limit as string);
    return res.status(200).json(responseData(true, SUCCESS, data));
  } catch (err) {
    log.error(err);
    return res.status(500).json(responseData(false, ERROR_500));
  }
};

const getDoctor = async (req: Request, res: Response) => {
  try {
    const id = parseInt(get(req, 'params.id'));
    const data = await doctorServices.getDoctor(id);

    if (!data) {
      return res.status(404).json(responseData(false, NOT_FOUND));
    }

    return res.status(200).json(responseData(true, SUCCESS, data));
  } catch (err) {
    log.error(err);
    return res.status(500).json(responseData(false, ERROR_500));
  }
};

const deleteDoctor = async (req: Request, res: Response) => {
  try {
    const id = parseInt(get(req, 'params.id'));
    const data = await doctorServices.deleteDoctor(id);

    if (!data) {
      return res.status(404).json(responseData(false, NOT_FOUND));
    }

    return res.status(200).json(responseData(true, SUCCESS));
  } catch (err) {
    log.error(err);
    return res.status(500).json(responseData(false, ERROR_500));
  }
};

const updateInfo = async (req: Request, res: Response) => {
  try {
    const currentEmail = res.locals.email;
    const { email, username, gender, address, phoneNumber } = req.body;
    const result = await doctorServices.updateInfo(currentEmail, email, username, gender, address, phoneNumber);

    if (!result) {
      return res.status(409).json(responseData(false, 'Email already exists !!!'));
    }

    return res.status(200).json(responseData(true, SUCCESS));
  } catch (err) {
    log.error(err);
    return res.status(500).json(responseData(false, ERROR_500));
  }
};

const doctorDetails = async (req: Request, res: Response) => {
  try {
    const email = res.locals.email;
    const result = await doctorServices.doctorDetails(email);

    if (!result) {
      return res.status(404).json(responseData(false, NOT_FOUND));
    }

    return res.status(200).json(responseData(true, SUCCESS));
  } catch (err) {
    log.error(err);
    return res.status(500).json(responseData(false, ERROR_500));
  }
};

export default { createDoctor, getAllDoctor, getDoctor, deleteDoctor, updateInfo, doctorDetails };
