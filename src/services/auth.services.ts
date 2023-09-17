import { v4 as uuidv4 } from 'uuid';

import User from '~/models/User.model';
import Role from '~/models/Role.model';
import Doctor from '~/models/Doctor.model';
import emailServices from './email.services';
import { URL_REACT } from '~/constants/variable.constants';
import { IUserInput } from '~/interfaces/user.interface';
import { passwordCompare, passwordHashing } from '~/utils/password.util';
import { generateToken } from '~/utils/jwt.util';

const signUp = async (
  body: Pick<IUserInput, 'email' | 'password' | 'username' | 'gender' | 'address' | 'phoneNumber'>,
): Promise<boolean> => {
  const { email, password } = body;
  const user = await User.findOne({ where: { email } });
  const doctor = await Doctor.findOne({ where: { email } });
  if (user || doctor) return false;
  const passwordHash = await passwordHashing(password);
  await User.create({ ...body, password: passwordHash, roleId: 3 });
  return true;
};

const signIn = async (email: string, password: string, role: string) => {
  let user;

  if (role === 'R2') {
    user = await Doctor.findOne({
      where: { email },
      attributes: ['email', 'username', 'password'],
      raw: true,
      nest: true,
      include: {
        model: Role,
        attributes: ['key', 'roleName'],
        as: 'role',
      },
    });
  } else {
    user = await User.findOne({
      where: { email },
      attributes: ['email', 'username', 'password'],
      raw: true,
      nest: true,
      include: {
        model: Role,
        attributes: ['key', 'roleName'],
        as: 'role',
      },
    });
  }

  if (!user) return false;
  if (user?.role.key !== role) return false;

  const resultPasswordCompare = await passwordCompare(password, user.password);

  if (!resultPasswordCompare) return false;

  const token = generateToken(user);

  return token;
};

const changePassword = async (newPassword: string, email: string, role: string): Promise<boolean> => {
  let user: User | Doctor | null;
  if (role === 'R2') {
    user = await Doctor.findOne({ where: { email: email } });
  } else {
    user = await User.findOne({ where: { email: email } });
  }
  if (!user) return false;
  const passwordHash = await passwordHashing(newPassword);
  role === 'R2'
    ? await (user as Doctor).update({ password: passwordHash })
    : await (user as User).update({ password: passwordHash });
  return true;
};

const forgotPassword = async (email: string, role: string): Promise<boolean> => {
  let user: User | Doctor | null;
  if (role === 'R2') {
    user = await Doctor.findOne({
      where: { email },
      attributes: ['username'],
      raw: true,
      nest: true,
      include: {
        model: Role,
        attributes: ['key'],
        as: 'role',
      },
    });
  } else {
    user = await User.findOne({
      where: { email },
      attributes: ['username'],
      raw: true,
      nest: true,
      include: {
        model: Role,
        attributes: ['key'],
        as: 'role',
      },
    });
  }

  if (!user) return false;
  if (user?.role?.key !== role) return false;

  const token = uuidv4();
  role === 'R2'
    ? await Doctor.update({ token: token }, { where: { email } })
    : await User.update({ token: token }, { where: { email } });
  const url = `${URL_REACT}/reset-password?token=${token}&email=${email}&role=${role}`;
  await emailServices.sendEmailForgotPassword({ email, url, name: user.username });
  return true;
};

const resetPassword = async (email: string, token: string, newPassword: string, role: string): Promise<boolean> => {
  let user;
  if (role === 'R2') {
    user = await Doctor.findOne({ where: { email: email }, raw: true });
  } else {
    user = await User.findOne({ where: { email: email }, raw: true });
  }
  if (!user) return false;
  if (user.token !== token) return false;
  const passwordHash = await passwordHashing(newPassword);
  role === 'R2'
    ? await Doctor.update({ password: passwordHash }, { where: { email } })
    : await User.update({ password: passwordHash }, { where: { email } });
  return true;
};

export default { signUp, signIn, changePassword, forgotPassword, resetPassword };
