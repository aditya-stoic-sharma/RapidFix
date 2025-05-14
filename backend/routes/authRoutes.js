import express from 'express';
import { loginUser, registerCustomer } from '../controllers/authController.js';

const router = express.Router();

router.post('/customer/register', registerCustomer);
router.get('/customer/login', loginUser)
// router.post('/technician/register', );

export default router;