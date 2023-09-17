import express from 'express';

import bookingControllers from '~/controllers/booking.controllers';
import validate from '~/middleware/validate.middleware';
import authorization from '~/middleware/authorization.middleware';
import {
  userBookingSchema,
  getBookingSchema,
  cancelBookingSchema,
  completeBookingSchema,
} from '~/schema/booking.schema';

const bookingRouter = express.Router();

bookingRouter.post(
  '/',
  validate(userBookingSchema),
  authorization.authenticated,
  authorization.userRole,
  bookingControllers.userBooking,
);

bookingRouter.post(
  '/:id',
  validate(completeBookingSchema),
  authorization.authenticated,
  authorization.doctorRole,
  bookingControllers.completeBooking,
);

bookingRouter.put(
  '/:id',
  validate(cancelBookingSchema),
  authorization.authenticated,
  authorization.userRole,
  bookingControllers.cancelBooking,
);

bookingRouter.get(
  '/',
  validate(getBookingSchema),
  authorization.authenticated,
  authorization.doctorRole,
  bookingControllers.getBooking,
);

export default bookingRouter;
