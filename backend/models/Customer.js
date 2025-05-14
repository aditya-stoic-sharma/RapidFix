// models/Customer.js
import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: String,
    password: { type: String, required: true },
    address: {
        city: String,
        pincode: String,
        coordinates: {
            lat: Number,
            lng: Number
        }
    },
    createdAt: { type: Date, default: Date.now }
});

const Customer = mongoose.model('Customer', customerSchema);
export default Customer;

