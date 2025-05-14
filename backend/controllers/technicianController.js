import Technician from '../models/Technicians.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const generateToken = (userId) => {
    return jwt.sign({ id: userId, role: 'technician' }, process.env.JWT_SECRET, {
        expiresIn: '7d',
    });
};

export const registerTechnician = async (req, res) => {
    try {
        const { name, email, password, phone, address, services } = req.body;
        const existingTech = await Technician.findOne({ email });

        if (existingTech) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newTech = await Technician.create({
            name,
            email,
            password: hashedPassword,
            phone,
            address,
            services,
        });

        res.status(201).json({
            _id: newTech._id,
            name: newTech.name,
            email: newTech.email,
            token: generateToken(newTech._id),
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const loginTechnician = async (req, res) => {
    try {
        const { email, password } = req.body;
        const technician = await Technician.findOne({ email });

        if (!technician) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, technician.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        res.status(200).json({
            _id: technician._id,
            name: technician.name,
            email: technician.email,
            token: generateToken(technician._id),
        });
    } catch (error) {
        res.status(500).json({ message: 'Login failed', error: error.message });
    }
};