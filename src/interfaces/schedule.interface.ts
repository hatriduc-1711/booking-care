import { Optional } from 'sequelize';

interface IScheduleAttributes {
  id: number;
  currentNumber?: number;
  maxNumber: number;
  date: string; // 25/8/2023
  timeSlotId: number;
  doctorId: number;

  createdAt?: Date;
  updatedAt?: Date;
}

interface IScheduleInput extends Optional<IScheduleAttributes, 'id'> {}
interface IScheduleOutput extends Required<IScheduleAttributes> {}

export { IScheduleAttributes, IScheduleInput, IScheduleOutput };
