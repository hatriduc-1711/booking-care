import { DataTypes, Model } from 'sequelize';

import sequelizeConnection from '~/configs/connectDB';
import { ITimeSlotAttributes, ITimeSlotInput } from '~/interfaces/time-slot.interface';

class TimeSlot extends Model<ITimeSlotAttributes, ITimeSlotInput> implements ITimeSlotAttributes {
  public id!: number;
  public timeSlot!: string;
  public key!: 'T1' | 'T2' | 'T3' | 'T4' | 'T5' | 'T6' | 'T7' | 'T8';

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

TimeSlot.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT,
    },
    timeSlot: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    key: {
      allowNull: false,
      type: DataTypes.STRING(10),
    },
  },
  {
    timestamps: true,
    sequelize: sequelizeConnection,
    underscored: false,
  },
);

export default TimeSlot;
