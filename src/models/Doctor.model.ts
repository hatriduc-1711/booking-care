import { DataTypes, Model } from 'sequelize';

import sequelizeConnection from '~/configs/connectDB';
import { IDoctorAttributes, IDoctorInput } from '~/interfaces/doctor.interface';

class Doctor extends Model<IDoctorAttributes, IDoctorInput> implements IDoctorAttributes {
  public id!: number;
  public username!: string;
  public email!: string;
  public password!: string;
  public token!: string;
  public address!: string;
  public phoneNumber!: string;
  public gender!: 0 | 1;
  public rankId!: number;
  public image!: string;
  public techniqueId!: number;
  public clinicId!: number;
  public roleId!: number;

  public role!: any;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Doctor.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT,
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    username: {
      allowNull: false,
      type: DataTypes.STRING(50),
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    token: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    address: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    phoneNumber: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    gender: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    image: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    rankId: {
      allowNull: false,
      type: DataTypes.BIGINT,
    },
    roleId: {
      allowNull: false,
      type: DataTypes.BIGINT,
    },
    techniqueId: {
      allowNull: false,
      type: DataTypes.BIGINT,
    },
    clinicId: {
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

export default Doctor;
