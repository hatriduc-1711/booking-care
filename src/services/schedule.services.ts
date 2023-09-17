import Schedule from '~/models/Schedule.model';
import checkDate from '~/utils/check-date.util';
import { IScheduleInput } from '~/interfaces/schedule.interface';
import TimeSlot from '~/models/Time-slot.model';
import Doctor from '~/models/Doctor.model';

const createSchedule = async (
  body: Pick<IScheduleInput, 'maxNumber' | 'doctorId' | 'timeSlotId' | 'date'>,
): Promise<number> => {
  const { date, doctorId, timeSlotId } = body;
  const check = checkDate(date);
  if (!check) return 1;
  const valid = await Schedule.findOne({ where: { date, doctorId, timeSlotId } });
  if (valid) return 2;
  await Schedule.create(body);
  return 0;
};

const getAllThePlansForTheDay = async (doctorId: number, date: string) => {
  const check = checkDate(date);
  if (!check) return false;
  const data = Schedule.findAll({ where: { doctorId, date } });
  return data;
};

const deleteSchedule = async (id: number): Promise<boolean> => {
  const schedule = await Schedule.findByPk(id);
  if (!schedule) return false;
  await Schedule.destroy();
  return true;
};

const getSchedule = async (id: number) => {
  const data = await Schedule.findOne({
    where: { id: id },
    attributes: ['id', 'currentNumber', 'maxNumber', 'date'],
    nest: true,
    include: [
      {
        model: TimeSlot,
        as: 'timeSlot',
      },
      {
        model: Doctor,
        as: 'doctor',
      },
    ],
  });
  return data;
};

export default { createSchedule, getAllThePlansForTheDay, deleteSchedule, getSchedule };
