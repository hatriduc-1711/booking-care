import { Optional } from 'sequelize';

interface ITimeSlotAttributes {
  id: number;
  timeSlot: string;
  key: 'T1' | 'T2' | 'T3' | 'T4' | 'T5' | 'T6' | 'T7' | 'T8';

  createdAt?: Date;
  updatedAt?: Date;
}

interface ITimeSlotInput extends Optional<ITimeSlotAttributes, 'id'> {}
interface ITimeSlotOutput extends Required<ITimeSlotAttributes> {}

export { ITimeSlotAttributes, ITimeSlotInput, ITimeSlotOutput };
