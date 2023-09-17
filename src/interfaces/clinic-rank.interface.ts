import { Optional } from 'sequelize';

interface IClinicRankAttributes {
  id: number;
  clinicId: number;
  rankId: number;

  createdAt?: Date;
  updatedAt?: Date;
}

interface IClinicRankInput extends Optional<IClinicRankAttributes, 'id'> {}
interface IClinicRankOutput extends Required<IClinicRankAttributes> {}

export { IClinicRankAttributes, IClinicRankInput, IClinicRankOutput };
