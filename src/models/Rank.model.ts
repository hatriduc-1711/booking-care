import { DataTypes, Model } from 'sequelize';

import sequelizeConnection from '~/configs/connectDB';
import { IRankAttributes, IRankInput } from '~/interfaces/rank.interface';

class Rank extends Model<IRankAttributes, IRankInput> implements IRankAttributes {
  public id!: number;
  public name!: string;
  public description!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Rank.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    description: {
      allowNull: true,
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
    sequelize: sequelizeConnection,
    underscored: false,
  },
);

export default Rank;
