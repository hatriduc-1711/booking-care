import * as Yup from 'yup';

const payload = {
  body: Yup.object({
    name: Yup.string().required('Name is required'),
    address: Yup.string().required('Address is required'),
    description: Yup.string(),
    image: Yup.string(),
  }),
};

const params = {
  params: Yup.object({
    id: Yup.string().required('id is required'),
  }),
};

const query = {
  query: Yup.object({
    limit: Yup.number().moreThan(0, 'Limit is not allowed'),
    page: Yup.number().moreThan(0, 'Page is not allowed'),
  }),
};

export const createClinicSchema = Yup.object({
  ...payload,
});

export const deleteClinicSchema = Yup.object({
  ...params,
});

export const getClinicSchema = Yup.object({
  ...params,
});

export const getAllClinicSchemas = Yup.object({
  ...query,
});

export const editInfoSchema = Yup.object({
  ...params,
  ...payload,
});
