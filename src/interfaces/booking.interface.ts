import { Optional } from 'sequelize';

interface IBookingAttributes {
  id: number;
  patientId: number;
  doctorId: number;
  timeSlotId: number;
  status: 'pending' | 'cancel' | 'complete';
  date: string; //25/8/2023

  createdAt?: Date;
  updatedAt?: Date;
}

interface IBookingInput extends Optional<IBookingAttributes, 'id'> {}
interface IBookingOutput extends Required<IBookingAttributes> {}

export { IBookingAttributes, IBookingInput, IBookingOutput };
