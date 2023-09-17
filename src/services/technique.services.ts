import Technique from '~/models/Technique.model';
import { ITechniqueInput } from '~/interfaces/technique.interface';
import Doctor from '~/models/Doctor.model';

const createTechnique = async (body: ITechniqueInput): Promise<boolean> => {
  const isValid = await Technique.findOne({ where: { name: body.name } });
  if (isValid) return false;
  await Technique.create({ ...body });
  return true;
};

const getAllTechniques = async () => {
  const data = await Technique.findAll();
  return data;
};

const getTechnique = async (id: number) => {
  const data = await Technique.findOne({
    where: { id: id },
    nest: true,
    include: {
      model: Doctor,
      as: 'doctors',
    },
  });

  return data;
};

const deleteTechnique = async (id: number): Promise<boolean> => {
  const technique = await Technique.findByPk(id);
  if (!technique) return false;
  await technique.destroy();
  return true;
};

export default { createTechnique, getAllTechniques, getTechnique, deleteTechnique };
