import Booking from '~/models/Booking.model';
import Schedule from '~/models/Schedule.model';
import checkDate from '~/utils/check-date.util';
import { IBookingInput } from '~/interfaces/booking.interface';

const userBooking = async (
  body: Pick<IBookingInput, 'patientId' | 'doctorId' | 'timeSlotId' | 'date'>,
): Promise<number> => {
  const { date, doctorId, patientId, timeSlotId } = body;
  const check = checkDate(date);
  if (!check) return 1;
  const schedule = await Schedule.findOne({ where: { date, doctorId, timeSlotId } });
  if (schedule?.currentNumber === schedule?.maxNumber) return 2;
  const valid = await Booking.findOne({ where: { date, doctorId, patientId, timeSlotId } });
  if (valid) return 3;
  await Booking.create({ ...body, status: 'pending' });
  await schedule?.update({ currentNumber: schedule?.currentNumber + 1 });
  return 0;
};

const getBooking = async (doctorId: number, date: string) => {
  const check = checkDate(date);
  if (!check) return false;
  const data = await Booking.findAll({ where: { doctorId, date } });
  return data;
};

const cancelBooking = async (id: number): Promise<boolean> => {
  const booking = await Booking.findByPk(id);
  if (!booking) return false;
  booking.update({ status: 'cancel' });
  return true;
};

const completeBooking = async (id: number): Promise<boolean> => {
  const booking = await Booking.findByPk(id);
  if (!booking) return false;
  booking.update({ status: 'complete' });
  return true;
};

export default { userBooking, getBooking, cancelBooking, completeBooking };
