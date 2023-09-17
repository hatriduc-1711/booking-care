import * as Yup from 'yup';

const params = {
  params: Yup.object({
    id: Yup.string().required('id is required'),
  }),
};

export const getAllUsersSchema = Yup.object({
  query: Yup.object({
    limit: Yup.number().moreThan(0, 'Limit is not allowed'),
    page: Yup.number().moreThan(0, 'Page is not allowed'),
  }),
});

export const getUserSchema = Yup.object({
  ...params,
});

export const deleteUserSchema = Yup.object({
  ...params,
});

export const editInfoSchema = Yup.object({
  body: Yup.object({
    email: Yup.string().email('Must be a valid email').required('Email is required'),
    username: Yup.string().max(30, 'Username maximum to 30 characters').required('Username is required'),
    gender: Yup.number()
      .integer('Value is not allowed')
      .lessThan(2, 'Value is not allowed')
      .moreThan(-1, 'Value is not allowed')
      .required('Gender is required'),
    address: Yup.string(),
    phoneNumber: Yup.string(),
  }),
});
