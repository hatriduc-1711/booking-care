import Clinic from '~/models/Clinic.model';
import Doctor from '~/models/Doctor.model';
import Rank from '~/models/Rank.model';
import Technique from '~/models/Technique.model';
import { IClinicInput } from '~/interfaces/clinic.interface';

const createClinic = async (body: IClinicInput): Promise<boolean> => {
  const isClinic = await Clinic.findOne({ where: { address: body.address } });
  if (isClinic) return false;
  await Clinic.create(body);
  return true;
};

const deleteClinic = async (id: number): Promise<boolean> => {
  const clinic = await Clinic.findByPk(id);
  if (!clinic) return false;
  await clinic.destroy();
  return true;
};

const getClinic = async (id: number) => {
  const clinic = await Clinic.findOne({
    where: { id },
    nest: true,
    raw: true,
    include: [
      {
        model: Doctor,
        attributes: ['id', 'email', 'username', 'gender', 'phoneNumber', 'image'],
        as: 'doctors',
      },
      {
        model: Rank,
        attributes: ['id', 'name', 'description'],
        as: 'ranks',
      },
      {
        model: Technique,
        attributes: ['id', 'name', 'description'],
        as: 'techniques',
      },
    ],
  });

  return clinic;
};

const getAllClinic = async (page: string, limit: string) => {
  const currentPage = page ? parseInt(page) : 1;
  const currentLimit = limit ? parseInt(limit) : 5;
  const offset = (currentPage - 1) * currentLimit;

  const { count, rows } = await Doctor.findAndCountAll({
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

const editInfo = async (body: IClinicInput, id: number): Promise<boolean> => {
  const checkClinic = await Clinic.findOne({ where: { address: body.address } });
  if (checkClinic) return false;
  const clinic = await Clinic.findByPk(id);
  clinic?.update(body);
  return true;
};

export default { createClinic, deleteClinic, getClinic, getAllClinic, editInfo };
