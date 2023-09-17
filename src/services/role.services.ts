import Role from '~/models/Role.model';
import { IRoleOutput } from '~/interfaces/role.interface';

const getAllRole = async (): Promise<IRoleOutput[]> => {
  const getAllRole = await Role.findAll();
  return getAllRole;
};

const getRoleById = async (id: number): Promise<IRoleOutput | null> => {
  const getRole = await Role.findByPk(id);
  return getRole;
};

const getRoleByName = async (name: string): Promise<boolean> => {
  const result = await Role.findOne({
    where: {
      roleName: name,
    },
  });
  if (result) return true;
  return false;
};

const deleteRole = async (id: number): Promise<boolean> => {
  const role = await Role.findByPk(id);
  if (!role) return false;
  await role.destroy();
  return true;
};

export default { getAllRole, getRoleById, getRoleByName, deleteRole };
