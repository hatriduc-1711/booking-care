import jwt, { JsonWebTokenError } from 'jsonwebtoken';
import { ACCESS_KEY_SECRET } from '~/constants/variable.constants';

const generateToken = (data: any): string => {
  const token = jwt.sign(data, ACCESS_KEY_SECRET as string, { expiresIn: '24h' });
  return token;
};

const verifyToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, ACCESS_KEY_SECRET as string);
    return { valid: true, decoded };
  } catch (error) {
    const message = (error as JsonWebTokenError).message;
    return {
      valid: false,
      message: message,
      decoded: null,
    };
  }
};

export { generateToken, verifyToken };
