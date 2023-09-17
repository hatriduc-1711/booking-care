import { Optional } from 'sequelize';

interface IClinicTechniqueAttributes {
  id: number;
  clinicId: number;
  techniqueId: number;

  createdAt?: Date;
  updatedAt?: Date;
}

interface IClinicTechniqueInput extends Optional<IClinicTechniqueAttributes, 'id'> {}
interface IClinicTechniqueOutput extends Required<IClinicTechniqueAttributes> {}

export { IClinicTechniqueAttributes, IClinicTechniqueInput, IClinicTechniqueOutput };
