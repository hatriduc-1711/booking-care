import * as Yup from 'yup';

export const createTechniqueSchema = Yup.object({
  body: Yup.object({
    name: Yup.string().required('Name is required'),
    description: Yup.string(),
  }),
});

const params = {
  params: Yup.object({
    id: Yup.string().required('Id is required'),
  }),
};

export const getTechniqueSchema = Yup.object({
  ...params,
});

export const deleteTechniqueSchema = Yup.object({
  ...params,
});
