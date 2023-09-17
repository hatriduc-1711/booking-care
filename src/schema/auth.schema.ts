import * as Yup from 'yup';

export const signUpSchema = Yup.object({
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
    address: Yup.string(),
    phoneNumber: Yup.string(),
  }),
});

export const signInSchema = Yup.object({
  body: Yup.object({
    email: Yup.string().email('Must be a valid email').required('Email is required'),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password is too short - should be 6 chars minimum.')
      .max(16, 'Password is too long - should be 16 chars maximum.')
      .matches(/^[a-zA-Z0-9_.-]*$/, 'Password can only contain Latin letters.'),
    role: Yup.string()
      .matches(/(R1|R2|R3)/, 'Invalid key')
      .required('Role is required'),
  }),
});

export const changePasswordSchema = Yup.object({
  body: Yup.object({
    newPassword: Yup.string()
      .required('Password is required')
      .min(8, 'Password is too short - should be 6 chars minimum.')
      .max(16, 'Password is too long - should be 16 chars maximum.')
      .matches(/^[a-zA-Z0-9_.-]*$/, 'Password can only contain Latin letters.'),
    passwordConfirmation: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('Please enter confirm password'),
  }),
});

export const forgotPasswordSchema = Yup.object({
  body: Yup.object({
    email: Yup.string().email('Must be a valid email').required('Email is required'),
    role: Yup.string()
      .matches(/(R1|R2|R3)/, 'Invalid key')
      .required('Role is required'),
  }),
});

export const resetPasswordSchema = Yup.object({
  body: Yup.object({
    email: Yup.string().email('Must be a valid email').required('Email is required'),
    token: Yup.string().required('Token is required'),
    role: Yup.string()
      .matches(/(R1|R2|R3)/, 'Invalid key')
      .required('Role is required'),
    newPassword: Yup.string()
      .required('Password is required')
      .min(8, 'Password is too short - should be 6 chars minimum.')
      .max(16, 'Password is too long - should be 16 chars maximum.')
      .matches(/^[a-zA-Z0-9_.-]*$/, 'Password can only contain Latin letters.'),
    passwordConfirmation: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('Please enter confirm password'),
  }),
});
