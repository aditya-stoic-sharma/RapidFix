// models/Booking.js
import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
    technician: { type: mongoose.Schema.Types.ObjectId, ref: 'Technician' },
    service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
    preferredTimeSlot: String,
    status: {
        type: String,
        enum: ['pending', 'accepted', 'in_progress', 'completed', 'cancelled'],
        default: 'pending'
    },
    location: {
        city: String,
        pincode: String,
        coordinates: {
            lat: Number,
            lng: Number
        }
    },
    issueDescription: String,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Booking', bookingSchema);
