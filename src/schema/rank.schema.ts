import * as Yup from 'yup';

export const getRankSchema = Yup.object({
  params: Yup.object({
    id: Yup.string().required('Id is required'),
  }),
});
