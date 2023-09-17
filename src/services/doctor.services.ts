import Doctor from '~/models/Doctor.model';
import User from '~/models/User.model';
import Clinic from '~/models/Clinic.model';
import Rank from '~/models/Rank.model';
import Technique from '~/models/Technique.model';
import { passwordCompare, passwordHashing } from '~/utils/password.util';

const createDoctor = async (body: any): Promise<number> => {
  const { email, username, password, gender, clinic, rank, technique, address, phoneNumber } = body;

  const doctor = await Doctor.findOne({ where: { email } });
  const user = await User.findOne({ where: { email } });

  if (doctor || user) return 1;

  const isClinic = await Clinic.findOne({ where: { name: clinic }, raw: true });
  if (!isClinic) return 2;

  const isRank = await Rank.findOne({ where: { name: rank }, raw: true });
  if (!isRank) return 2;

  const isTechnique = await Technique.findOne({ where: { name: technique }, raw: true });
  if (!isTechnique) return 2;

  const passwordHash = await passwordHashing(password);
  await Doctor.create({
    email,
    username,
    gender,
    address,
    phoneNumber,
    password: passwordHash,
    roleId: 2,
    clinicId: isClinic.id,
    rankId: isRank.id,
    techniqueId: isTechnique.id,
  });

  return 0;
};

const getAllDoctor = async (page: string, limit: string) => {
  const currentPage = page ? parseInt(page) : 1;
  const currentLimit = limit ? parseInt(limit) : 10;
  const offset = (currentPage - 1) * currentLimit;

  const { count, rows } = await Doctor.findAndCountAll({
    attributes: ['id', 'email', 'username', 'gender', 'phoneNumber', 'image'],
    offset: offset,
    limit: currentLimit,
    nest: true,
    include: [
      {
        model: Rank,
        as: 'rank',
        attributes: ['id', 'name', 'description'],
      },
      {
        model: Clinic,
        as: 'clinic',
        attributes: ['id', 'name', 'description', 'address'],
      },
      {
        model: Technique,
        as: 'technique',
        attributes: ['id', 'name', 'description'],
      },
    ],
    raw: true,
  });

  const totalPages = Math.ceil(count / currentLimit);

  const data = {
    totalPages,
    total: count,
    data: rows,
  };

  return data;
};

const getDoctor = async (id: number) => {
  const doctor = await Doctor.findOne({
    where: { id },
    attributes: ['id', 'email', 'username', 'gender', 'phoneNumber', 'image'],
    nest: true,
    include: [
      {
        model: Rank,
        as: 'rank',
        attributes: ['id', 'name', 'description'],
      },
      {
        model: Clinic,
        as: 'clinic',
        attributes: ['id', 'name', 'description', 'address'],
      },
      {
        model: Technique,
        as: 'technique',
        attributes: ['id', 'name', 'description'],
      },
    ],
    raw: true,
  });

  return doctor;
};

const deleteDoctor = async (id: number): Promise<boolean> => {
  const doctor = await Doctor.findByPk(id);
  if (!doctor) return false;
  await doctor.destroy();
  return true;
};

const updateInfo = async (
  currentEmail: string,
  email: string,
  username: string,
  gender: 0 | 1,
  address: string,
  phoneNumber: string,
): Promise<boolean> => {
  const isDoctor = await Doctor.findOne({ where: { email } });
  if (!isDoctor) return false;
  const doctor = await Doctor.findOne({ where: { email: currentEmail } });
  if (!doctor) return false;
  doctor.update({
    email,
    username,
    gender,
    address,
    phoneNumber,
  });

  return true;
};

const doctorDetails = async (email: string) => {
  const data = await Doctor.findOne({
    where: { email },
    attributes: ['id', 'email', 'username', 'gender', 'phoneNumber', 'image', 'address'],
    nest: true,
    include: [
      {
        model: Rank,
        as: 'rank',
        attributes: ['id', 'name', 'description'],
      },
      {
        model: Clinic,
        as: 'clinic',
        attributes: ['id', 'name', 'description', 'address'],
      },
      {
        model: Technique,
        as: 'technique',
        attributes: ['id', 'name', 'description'],
      },
    ],
    raw: true,
  });

  return data;
};

export default { createDoctor, getAllDoctor, getDoctor, deleteDoctor, updateInfo, doctorDetails };
