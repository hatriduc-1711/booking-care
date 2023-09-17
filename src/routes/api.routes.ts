import express, { Express } from 'express';
import authRouter from './auth.routes';
import roleRouter from './role.routes';
import doctorRouter from './doctor.routes';
import clinicRouter from './clinic.routes';
import timeSlotRouter from './time-slot.routes';
import rankRouter from './rank.routes';
import techniqueRouter from './technique.routes';
import userRouter from './user.routes';
import scheduleRouter from './schedule.routes';
import bookingRouter from './booking.routes';

const router = express.Router();

const initApIRouter = (app: Express) => {
  router.use('/auth', authRouter);
  router.use('/role', roleRouter);
  router.use('/doctor', doctorRouter);
  router.use('/clinic', clinicRouter);
  router.use('/time-slot', timeSlotRouter);
  router.use('/rank', rankRouter);
  router.use('/technique', techniqueRouter);
  router.use('/user', userRouter);
  router.use('/schedule', scheduleRouter);
  router.use('/booking', bookingRouter);
  return app.use('/api/v1', router);
};

export default initApIRouter;
