import { DataTypes, Model } from 'sequelize';

import sequelizeConnection from '~/configs/connectDB';
import { IRankTechniqueAttributes, IRankTechniqueInput } from '~/interfaces/rank-technique.interface';

class RankTechnique extends Model<IRankTechniqueAttributes, IRankTechniqueInput> implements IRankTechniqueAttributes {
  public id!: number;
  public techniqueId!: number;
  public rankId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

RankTechnique.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT,
    },
    techniqueId: {
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

export default RankTechnique;
