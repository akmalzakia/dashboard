import { Response } from 'express';
import User from '../models/user';
import { JwtRequest, TypedRequestBody } from '../utils/types';

async function getCurrentUser(req: JwtRequest, res: Response) {
	try {
		const userId = req.userId;
		const user = (await User.findById(userId).select('-password')).toObject();
		res.send({
			user,
		});
	} catch (error) {
		console.error(error);
	}
}

export const UserController = { getCurrentUser };
