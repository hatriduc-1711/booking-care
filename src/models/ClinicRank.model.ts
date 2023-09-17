import { DataTypes, Model } from 'sequelize';

import sequelizeConnection from '~/configs/connectDB';
import { IClinicRankAttributes, IClinicRankInput } from '~/interfaces/clinic-rank.interface';

class ClinicRank extends Model<IClinicRankAttributes, IClinicRankInput> implements IClinicRankAttributes {
  public id!: number;
  public clinicId!: number;
  public rankId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

ClinicRank.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT,
    },
    clinicId: {
      allowNull: false,
      type: DataTypes.BIGINT,
    },
    rankId: {
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

export default ClinicRank;
