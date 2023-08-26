import express from 'express';
const bookingRouter=express.Router();
import {getBookingById, newBooking,deleteBooking} from'../controllers/booking-controller.js';
bookingRouter.post('/',newBooking);
bookingRouter.get('/:id',getBookingById);
bookingRouter.delete('/:id',deleteBooking);




export default bookingRouter;