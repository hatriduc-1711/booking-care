import * as Yup from 'yup';

export const userBookingSchema = Yup.object({
  body: Yup.object({
    patientId: Yup.number().required('patientId is required'),
    doctorId: Yup.number().required('patientId is required'),
    timeSlotId: Yup.number().required('patientId is required'),
    date: Yup.string().required('Value is required !!!'),
  }),
});

export const getBookingSchema = Yup.object({
  query: Yup.object({
    doctorId: Yup.number().required('patientId is required'),
    date: Yup.string().required('Value is required !!!'),
  }),
});

export const cancelBookingSchema = Yup.object({
  params: Yup.object({
    id: Yup.string().required('id is required'),
  }),
});

export const completeBookingSchema = Yup.object({
  params: Yup.object({
    id: Yup.string().required('id is required'),
  }),
});
