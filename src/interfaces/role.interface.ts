import { Optional } from 'sequelize';

interface IRoleAttributes {
  id: number;
  roleName: string;
  key: 'R1' | 'R2' | 'R3';

  createdAt?: Date;
  updatedAt?: Date;
}

interface IRoleInput extends Optional<IRoleAttributes, 'id'> {}
interface IRoleOutput extends Required<IRoleAttributes> {}

export { IRoleAttributes, IRoleInput, IRoleOutput };
