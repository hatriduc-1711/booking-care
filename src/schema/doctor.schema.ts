import * as Yup from 'yup';

export const createDoctorSchema = Yup.object({
  body: Yup.object({
    email: Yup.string().email('Must be a valid email').required('Email is required'),
    username: Yup.string().max(30, 'Username maximum to 30 characters').required('Username is required'),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password is too short - should be 6 chars minimum.')
      .max(16, 'Password is too long - should be 16 chars maximum.')
      .matches(/^[a-zA-Z0-9_.-]*$/, 'Password can only contain Latin letters.'),
    passwordConfirmation: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('Please enter confirm password'),
    gender: Yup.number()
      .integer('Value is not allowed')
      .lessThan(2, 'Value is not allowed')
      .moreThan(-1, 'Value is not allowed')
      .required('Gender is required'),
    clinic: Yup.string().required('Clinic is required'),
    rank: Yup.string().required('Rank is required'),
    technique: Yup.string().required('Technique is required'),
    address: Yup.string(),
    phoneNumber: Yup.string(),
  }),
});

export const getAllDoctorSchema = Yup.object({
  query: Yup.object({
    limit: Yup.number().moreThan(0, 'Limit is not allowed'),
    page: Yup.number().moreThan(0, 'Page is not allowed'),
  }),
});

export const getDoctorSchema = Yup.object({
  params: Yup.object({
    id: Yup.string().required('id is required'),
  }),
});

export const updateInfoSchema = Yup.object({
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
