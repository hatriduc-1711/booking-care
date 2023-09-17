import History from '~/models/History.model';
import Booking from '~/models/Booking.model';

const getHistory = async (patientId: number) => {
  const data = await Booking.findAll({ where: { patientId, status: 'complete' } });
  return data;
};

const deleteHistory = async (id: number): Promise<boolean> => {
  const history = await Booking.findOne({ where: { id, status: 'complete' } });
  if (!history) return false;
  history.destroy();
  return true;
};

export default { getHistory, deleteHistory };
