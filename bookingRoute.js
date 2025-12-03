// backend/routes/bookingRoute.js
import express from 'express';
import { 
    createBooking, 
    getAllBookings, 
    getUserBookings, 
    deleteBooking, 
    updateBooking 
} from '../controllers/bookingController.js';
import authMiddleware from '../middleware/authMiddleware.js';


const bookingRouter = express.Router();

// All routes require authentication
bookingRouter.post('/create', authMiddleware, createBooking);
bookingRouter.get('/all', authMiddleware, getAllBookings);
bookingRouter.get('/user', authMiddleware, getUserBookings);
bookingRouter.delete('/:id', authMiddleware, deleteBooking);
bookingRouter.put('/:id', authMiddleware, updateBooking);

export default bookingRouter;