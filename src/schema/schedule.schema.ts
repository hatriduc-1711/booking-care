import * as Yup from 'yup';

export const createScheduleSchema = Yup.object({
  body: Yup.object({
    maxNumber: Yup.number()
      .lessThan(6, 'Value is not allowed')
      .moreThan(0, 'Value is not allowed')
      .required('Value is required !!!'),
    timeSlotId: Yup.number().required('Value is required !!!'),
    doctorId: Yup.number().required('Value is required !!!'),
    date: Yup.string().required('Value is required !!!'),
  }),
});

export const getAllThePlansForTheDaySchema = Yup.object({
  query: Yup.object({
    doctorId: Yup.number().required('Value is required !!!'),
    date: Yup.string().required('Value is required !!!'),
  }),
});

const params = {
  params: Yup.object({
    id: Yup.string().required('id is required'),
  }),
};

export const deleteScheduleSchema = Yup.object({
  ...params,
});

export const getScheduleSchema = Yup.object({
  ...params,
});
