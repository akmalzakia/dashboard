import express from 'express';
import { LoginController, RegisterController } from '../controllers/auth';

const router = express.Router();

router.post('/login', LoginController);
router.post('/register', RegisterController);

export default router;
