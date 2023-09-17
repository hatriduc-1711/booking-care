import { Optional } from 'sequelize';

interface IHistoryAttributes {
  id: number;
  description?: string;
  patientId: number;
  doctorId: number;
  timeSlotId: number;
  date: string; //25/8/2023

  createdAt?: Date;
  updatedAt?: Date;
}

interface IHistoryInput extends Optional<IHistoryAttributes, 'id'> {}
interface IHistoryOutput extends Required<IHistoryAttributes> {}

export { IHistoryAttributes, IHistoryInput, IHistoryOutput };
