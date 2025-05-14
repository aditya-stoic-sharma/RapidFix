// models/Service.js
import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    price: { type: Number, required: true }
});

module.exports = mongoose.model('Service', serviceSchema);



