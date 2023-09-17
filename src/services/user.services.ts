import User from '~/models/User.model';
import Booking from '~/models/Booking.model';
import History from '~/models/History.model';
import { IUserInput } from '~/interfaces/user.interface';

const getAllUsers = async (page: string, limit: string) => {
  const currentPage = page ? parseInt(page) : 1;
  const currentLimit = limit ? parseInt(limit) : 10;
  const offset = (currentPage - 1) * currentLimit;

  const { count, rows } = await User.findAndCountAll({
    where: { roleId: 3 },
    attributes: ['id', 'email', 'username', 'gender', 'phoneNumber'],
    offset: offset,
    limit: currentLimit,
  });

  const totalPages = Math.ceil(count / currentLimit);

  const data = {
    totalPages,
    total: count,
    data: rows,
  };

  return data;
};

const getUser = async (id: number) => {
  const user = await User.findOne({
    where: { id },
    attributes: ['id', 'email', 'username', 'gender', 'phoneNumber', 'address'],
  });
  return user;
};

const userDetails = async (email: string) => {
  const user = await User.findOne({
    where: { email },
    attributes: ['id', 'email', 'username', 'gender', 'phoneNumber', 'address'],
    nest: true,
    include: [
      {
        model: Booking,
        as: 'bookings',
      },
      {
        model: History,
        as: 'history',
      },
    ],
  });
  return user;
};

const editInfo = async (
  body: Pick<IUserInput, 'address' | 'email' | 'gender' | 'username' | 'phoneNumber'>,
  currentEmail: string,
): Promise<boolean> => {
  const isValid = await User.findOne({ where: { email: body.email } });
  if (isValid) return false;
  const user = await User.findOne({ where: { email: currentEmail } });
  if (!user) return false;
  user.update(body);
  return true;
};

const removeAccount = async (email: string): Promise<boolean> => {
  const user = await User.findOne({ where: { email } });
  if (!user) return false;
  await user.destroy();
  return true;
};

const deleteUser = async (id: number): Promise<boolean> => {
  const user = await User.findByPk(id);
  if (!user) return false;
  await user.destroy();
  return true;
};

export default { getAllUsers, getUser, userDetails, editInfo, removeAccount, deleteUser };
