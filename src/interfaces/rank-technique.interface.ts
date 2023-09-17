import { Optional } from 'sequelize';

interface IRankTechniqueAttributes {
  id: number;
  techniqueId: number;
  rankId: number;

  createdAt?: Date;
  updatedAt?: Date;
}

interface IRankTechniqueInput extends Optional<IRankTechniqueAttributes, 'id'> {}
interface IRankTechniqueOutput extends Required<IRankTechniqueAttributes> {}

export { IRankTechniqueAttributes, IRankTechniqueInput, IRankTechniqueOutput };
