import Customer from '../models/Customer.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: '7d',
    });
};

export const registerCustomer = async (req, res) => {
    try {
        const { name, email, password, phone, address } = req.body;
        const existingUser = await Customer.findOne({ email });

        if (existingUser) {
            res.status(400).send({ message: 'Email already registered' });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const newCustomer = await Customer.create({
            name,
            email,
            password: hashPassword,
            phone,
            address
        })

        res.status(201).json({
            _id: newCustomer._id,
            name: newCustomer.name,
            email: newCustomer.email,
            token: generateToken(newCustomer._id),
        })

    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
}


export const loginUser = async (req, res) => {
    try {

        const { email, password } = req.body;
        const Logcustomer = await Customer.findOne({ email });
        if (!Logcustomer) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        console.log(Logcustomer.name);

        const isMatch = await bcrypt.compare(password, Logcustomer.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        res.status(200).json({
            _id: Logcustomer._id,
            name: Logcustomer.name,
            email: Logcustomer.email,
            token: generateToken(Logcustomer._id)
        });


    } catch (error) {
        res.status(500).json({ message: 'not able to login', error: error.message });
    }
}
