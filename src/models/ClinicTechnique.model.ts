import { DataTypes, Model } from 'sequelize';

import sequelizeConnection from '~/configs/connectDB';
import { IClinicTechniqueAttributes, IClinicTechniqueInput } from '~/interfaces/clinic-technique.interface';

class ClinicTechnique
  extends Model<IClinicTechniqueAttributes, IClinicTechniqueInput>
  implements IClinicTechniqueAttributes
{
  public id!: number;
  public clinicId!: number;
  public techniqueId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

ClinicTechnique.init(
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
    techniqueId: {
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

export default ClinicTechnique;
