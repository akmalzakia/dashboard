import express from 'express';

import authRoutes from '../routes/auth';
import userRoutes from '../routes/user';
import ticketRoutes from '../routes/tickets';

const router = express.Router();

router.use('/', userRoutes);
router.use('/', ticketRoutes);
router.use('/auth', authRoutes);

export default router;
