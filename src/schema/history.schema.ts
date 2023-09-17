import * as Yup from 'yup';

export const getHistorySchema = Yup.object({
  params: Yup.object({
    patientId: Yup.number().required('Id is required'),
  }),
});

export const deleteHistorySchema = Yup.object({
  params: Yup.object({
    id: Yup.number().required('Id is required'),
  }),
});
