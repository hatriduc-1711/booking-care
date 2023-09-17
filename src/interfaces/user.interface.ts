import { Optional } from 'sequelize';

export interface IUserAttributes {
  id: number;
  email: string;
  username: string;
  password: string;
  token?: string;
  address?: string;
  phoneNumber?: string;
  gender: 0 | 1;
  roleId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUserInput extends Optional<IUserAttributes, 'id'> {}
export interface IUserOutput extends Required<IUserAttributes> {}
