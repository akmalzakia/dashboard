import express from 'express';
import { JWTAuthMiddleware, JwtRequest } from '../middlewares/auth';
import User from '../models/user';
const router = express.Router();

router.get('/user', JWTAuthMiddleware, async (req: JwtRequest, res) => {
	try {
		const userId = req.userId;
		const user = (await User.findById(userId).select('-password')).toObject();
		res.send({
			user,
		});
	} catch (error) {
		console.error(error);
	}
});


export default router;
