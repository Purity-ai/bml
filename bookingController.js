// backend/controllers/bookingController.js
import bookingModel from '../models/bookingModel.js';

// Create a new booking
const createBooking = async (req, res) => {
    try {
        const { lectureName, venue, program, date, time, duration, lecturer } = req.body;

        // Validate all required fields
        if (!lectureName || !venue || !program || !date || !time || !duration || !lecturer) {
            return res.json({ success: false, message: "Missing required fields" });
        }

        // Check for booking conflicts
        const existingBookings = await bookingModel.find({ 
            venue, 
            date,
            status: 'confirmed'
        });

        // Check time conflicts
        const newStart = new Date(`${date}T${time}`);
        const newEnd = new Date(newStart.getTime() + parseInt(duration) * 60 * 60 * 1000);

        for (let booking of existingBookings) {
            const existingStart = new Date(`${booking.date}T${booking.time}`);
            const existingEnd = new Date(existingStart.getTime() + parseInt(booking.duration) * 60 * 60 * 1000);

            if ((newStart >= existingStart && newStart < existingEnd) ||
                (newEnd > existingStart && newEnd <= existingEnd) ||
                (newStart <= existingStart && newEnd >= existingEnd)) {
                return res.json({ 
                    success: false, 
                    message: `Conflict detected! ${venue} is already booked for ${booking.lectureName} at ${booking.time} on ${date}` 
                });
            }
        }

        // Create new booking
        const bookingData = {
            lectureName,
            venue,
            program,
            date,
            time,
            duration,
            lecturer,
            bookedBy: req.userId // From auth middleware
        };

        const newBooking = new bookingModel(bookingData);
        await newBooking.save();

        res.json({ 
            success: true, 
            message: "Lecture booked successfully!",
            booking: newBooking
        });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Get all bookings
const getAllBookings = async (req, res) => {
    try {
        const bookings = await bookingModel.find({ status: 'confirmed' })
            .sort({ date: 1, time: 1 });
        
        res.json({ success: true, bookings });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Get bookings by user (for students to see their lectures)
const getUserBookings = async (req, res) => {
    try {
        const bookings = await bookingModel.find({ 
            bookedBy: req.userId,
            status: 'confirmed'
        }).sort({ date: 1, time: 1 });
        
        res.json({ success: true, bookings });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Delete/Cancel a booking
const deleteBooking = async (req, res) => {
    try {
        const { id } = req.params;

        const booking = await bookingModel.findById(id);
        
        if (!booking) {
            return res.json({ success: false, message: "Booking not found" });
        }

        // Update status to cancelled instead of deleting
        booking.status = 'cancelled';
        await booking.save();

        res.json({ success: true, message: "Booking cancelled successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Update a booking
const updateBooking = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const booking = await bookingModel.findByIdAndUpdate(id, updates, { new: true });
        
        if (!booking) {
            return res.json({ success: false, message: "Booking not found" });
        }

        res.json({ success: true, message: "Booking updated successfully", booking });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export { 
    createBooking, 
    getAllBookings, 
    getUserBookings, 
    deleteBooking, 
    updateBooking 
};