// models/Technician.js
import mongoose from 'mongoose';

const technicianSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: String,
    password: { type: String, required: true },
    services: [String], // ['Plumbing', 'Electrical', etc.]
    rating: { type: Number, default: 0 },
    tnumber: Number,
    address: {
        city: String,
        pincode: String,
        coordinates: {
            lat: Number,
            lng: Number
        }
    },
    availability: [
        {
            day: String, // 'Monday'
            slots: [String] // ['10:00-12:00', '14:00-16:00']
        }
    ],
    isAvailable: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now }
});

const Technician = mongoose.model('Technician', technicianSchema);
export default Technician;
