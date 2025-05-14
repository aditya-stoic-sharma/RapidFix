import express from 'express';
import { loginTechnician, registerTechnician } from '../controllers/technicianController.js';

const router = express.Router();

router.post('/register', registerTechnician);
router.post('/login', loginTechnician);

export default router;