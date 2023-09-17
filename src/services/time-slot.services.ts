import TimeSlot from '~/models/Time-slot.model';
import { ITimeSlotInput } from '~/interfaces/time-slot.interface';

const createTimeSlot = async (body: ITimeSlotInput): Promise<boolean> => {
  const isTimeSlot = await TimeSlot.findOne({ where: { key: body.key } });
  if (isTimeSlot) return false;
  await TimeSlot.create({ ...body });
  return true;
};

const deleteTimeSlot = async (id: number): Promise<boolean> => {
  const timeSlot = await TimeSlot.findOne({ where: { id } });
  if (!timeSlot) return false;
  await timeSlot.destroy();
  return true;
};

export default { createTimeSlot, deleteTimeSlot };
