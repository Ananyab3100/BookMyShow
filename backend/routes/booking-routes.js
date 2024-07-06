import express from 'express';
import { newBooking } from '../controllers/bookings-controller.js';
import { getBookingById } from '../controllers/bookings-controller.js';
import { deleteBooking } from '../controllers/bookings-controller.js';

const bookingsRouter = express.Router();

bookingsRouter.post("/" ,newBooking);
bookingsRouter.get("/:id" ,getBookingById);
bookingsRouter.delete("/:id",deleteBooking);


export default bookingsRouter;