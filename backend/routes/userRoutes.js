import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import deleteCustomer from '../controllers/customerController.js';

const router = express.Router();

router.delete('/:id', protect, deleteCustomer);

export default router;
