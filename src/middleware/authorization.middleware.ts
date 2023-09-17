import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';

import roleServices from '~/services/role.services';
import responseData from '~/utils/response-data.util';
import { ERROR_500, ERROR_401, ERROR_403 } from '~/constants/message.constants';
import { verifyToken } from '~/utils/jwt.util';

const authenticated = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authToken = req.headers['authorization'];
    const token = authToken && authToken.split(' ')[1];

    if (!token) {
      return res.status(401).json(responseData(false, ERROR_401));
    }

    const resultVerify = verifyToken(token);

    if (!resultVerify.valid) {
      return res.status(401).json(responseData(false, ERROR_401));
    }

    res.locals.role = (resultVerify.decoded as JwtPayload)?.role;
    res.locals.email = (resultVerify.decoded as JwtPayload)?.email;
    next();
  } catch {
    return res.status(500).json(responseData(false, ERROR_500));
  }
};

const adminRole = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const role = res.locals.role;

    if (role?.key !== 'R1') {
      return res.status(403).json(responseData(false, ERROR_403));
    }
    next();
  } catch {
    return res.status(500).json(responseData(false, ERROR_500));
  }
};

const doctorRole = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const role = res.locals.role;

    if (role?.key !== 'R2') {
      return res.status(403).json(responseData(false, ERROR_403));
    }
    next();
  } catch {
    return res.status(500).json(responseData(false, ERROR_500));
  }
};

const userRole = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const role = res.locals.role;

    if (role?.key !== 'R3') {
      return res.status(403).json(responseData(false, ERROR_403));
    }
    next();
  } catch {
    return res.status(500).json(responseData(false, ERROR_500));
  }
};

export default { authenticated, adminRole, doctorRole, userRole };
