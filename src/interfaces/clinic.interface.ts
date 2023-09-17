import { Optional } from 'sequelize';

interface IClinicAttributes {
  id: number;
  name: string;
  description?: string;
  address: string;
  image?: string;

  createdAt?: Date;
  updatedAt?: Date;
}

interface IClinicInput extends Optional<IClinicAttributes, 'id'> {}
interface IClinicOutput extends Required<IClinicAttributes> {}

export { IClinicAttributes, IClinicInput, IClinicOutput };
