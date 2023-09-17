import { DataTypes, Model } from 'sequelize';

import sequelizeConnection from '~/configs/connectDB';
import { IScheduleAttributes, IScheduleInput } from '~/interfaces/schedule.interface';

class Schedule extends Model<IScheduleAttributes, IScheduleInput> implements IScheduleAttributes {
  public id!: number;
  public currentNumber!: number;
  public maxNumber!: number;
  public date!: string; //25/8/2023
  public timeSlotId!: number;
  public doctorId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Schedule.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT,
    },
    currentNumber: {
      allowNull: true,
      type: DataTypes.INTEGER,
    },
    maxNumber: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    date: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    timeSlotId: {
      allowNull: false,
      type: DataTypes.BIGINT,
    },
    doctorId: {
      allowNull: false,
      type: DataTypes.BIGINT,
    },
  },
  {
    timestamps: true,
    sequelize: sequelizeConnection,
    underscored: false,
  },
);

export default Schedule;
