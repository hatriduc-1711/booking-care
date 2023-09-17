import { AnySchema } from 'yup';
import { Request, Response, NextFunction } from 'express';

import responseData from '~/utils/response-data.util';
import { IErrorValidate } from '~/interfaces/error.interface';

const validate = (schema: AnySchema) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    await schema.validate({
      body: req.body,
      query: req.query,
      params: req.params,
    });

    return next();
  } catch (error) {
    const errorMessage = (error as IErrorValidate).message;
    return res.status(400).json(responseData(false, errorMessage));
  }
};

export default validate;
