import { Optional } from 'sequelize';

interface ITechniqueAttributes {
  id: number;
  name: string;
  description?: string;

  createdAt?: Date;
  updatedAt?: Date;
}

interface ITechniqueInput extends Optional<ITechniqueAttributes, 'id'> {}
interface ITechniqueOutput extends Required<ITechniqueAttributes> {}

export { ITechniqueAttributes, ITechniqueInput, ITechniqueOutput };
