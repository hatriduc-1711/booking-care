import { DataTypes, Model } from 'sequelize';

import sequelizeConnection from '~/configs/connectDB';
import { IHistoryAttributes, IHistoryInput } from '~/interfaces/history.interface';

class Booking extends Model<IHistoryAttributes, IHistoryInput> implements IHistoryAttributes {
  public id!: number;
  public patientId!: number;
  public doctorId!: number;
  public timeSlotId!: number;
  public description!: string;
  public date!: string; //25/8/2023

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Booking.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT,
    },
    patientId: {
      allowNull: false,
      type: DataTypes.BIGINT,
    },
    doctorId: {
      allowNull: false,
      type: DataTypes.BIGINT,
    },
    timeSlotId: {
      allowNull: false,
      type: DataTypes.BIGINT,
    },
    description: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    date: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
    sequelize: sequelizeConnection,
    underscored: false,
  },
);

export default Booking;
