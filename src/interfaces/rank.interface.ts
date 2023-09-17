import { Optional } from 'sequelize';

interface IRankAttributes {
  id: number;
  name: string;
  description?: string;

  createdAt?: Date;
  updatedAt?: Date;
}

interface IRankInput extends Optional<IRankAttributes, 'id'> {}
interface IRankOutput extends Required<IRankAttributes> {}

export { IRankAttributes, IRankInput, IRankOutput };
