import { DataTypes, Model } from 'sequelize';

import sequelizeConnection from '~/configs/connectDB';
import { IRoleAttributes, IRoleInput } from '~/interfaces/role.interface';

class Role extends Model<IRoleAttributes, IRoleInput> implements IRoleAttributes {
  public id!: number;
  public roleName!: string;
  public key!: 'R1' | 'R2' | 'R3';

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Role.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT,
    },
    roleName: {
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

export default Role;
