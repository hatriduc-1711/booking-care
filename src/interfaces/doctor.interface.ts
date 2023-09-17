import { Optional } from 'sequelize';

export interface IDoctorAttributes {
  id: number;
  email: string;
  username: string;
  password: string;
  token?: string;
  address?: string;
  phoneNumber?: string;
  gender: 0 | 1;
  rankId: number;
  image?: string;
  roleId: number;
  techniqueId: number;
  clinicId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IDoctorInput extends Optional<IDoctorAttributes, 'id'> {}
export interface IDoctorOutput extends Required<IDoctorAttributes> {}
