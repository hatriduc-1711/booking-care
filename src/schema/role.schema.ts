import * as Yup from 'yup';

const payload = {
  body: Yup.object({
    roleName: Yup.string().required('roleName is required'),
    key: Yup.string()
      .matches(/(R1|R2|R3)/, 'Invalid key')
      .required('key is required'),
  }),
};

const params = {
  params: Yup.object({
    id: Yup.string().required('id is required'),
  }),
};

export const createRoleSchema = Yup.object({
  ...payload,
});

export const getRoleByIdSchema = Yup.object({
  ...params,
});

export const deleteRoleByIdSchema = Yup.object({
  ...params,
});
