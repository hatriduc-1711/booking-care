import * as Yup from 'yup';

const payload = {
  body: Yup.object({
    timeSlot: Yup.string().required('TimeSlot is required'),
    key: Yup.string()
      .matches(/(T1|T2|T3|T4|T5|T6|T7|T8)/, 'Invalid key')
      .required('key is required'),
  }),
};

const params = {
  params: Yup.object({
    id: Yup.string().required('Id is required'),
  }),
};

export const createTimeSlotSchema = Yup.object({
  ...payload,
});

export const deleteTimeSlotSchema = Yup.object({
  ...params,
});
