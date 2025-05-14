import jwt from 'jsonwebtoken';
import Customer from '../models/Customer.js';
// import Technician from '../models/Technician.js';
import Technician from '../models/Technicians.js';

export const protect = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Not authorized' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded.role === 'technician') {
            req.user = await Technician.findById(decoded.id).select('-password');
        } else {
            req.user = await Customer.findById(decoded.id).select('-password');
        }

        next();

    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};