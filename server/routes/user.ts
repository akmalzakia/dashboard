import express from 'express';
import { JWTAuthMiddleware } from '../middlewares/auth';
import { UserController } from '../controllers/user';
const router = express.Router();

router.get('/user', JWTAuthMiddleware, UserController.getCurrentUser);

export default router;
