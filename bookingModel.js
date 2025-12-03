// backend/models/bookingModel.js
import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
    lectureName: { 
        type: String, 
        required: true 
    },
    venue: { 
        type: String, 
        required: true 
    },
    program: { 
        type: String, 
        required: true 
    },
    date: { 
        type: String, 
        required: true 
    },
    time: { 
        type: String, 
        required: true 
    },
    duration: { 
        type: String, 
        required: true 
    },
    lecturer: { 
        type: String, 
        required: true 
    },
    bookedBy: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'user',
        required: true 
    },
    status: { 
        type: String, 
        enum: ['confirmed', 'cancelled', 'completed'],
        default: 'confirmed'
    }
}, { 
    timestamps: true 
});

const bookingModel = mongoose.models.booking || mongoose.model('booking', bookingSchema);

export default bookingModel;