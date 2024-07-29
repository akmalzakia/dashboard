import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import bcrypt from 'bcrypt';

const router = express.Router();

interface TypedRequestBody<T> extends Express.Request {
	body: T;
}

router.post(
	'/login',
	async (req: TypedRequestBody<{ email: string; password: string }>, res) => {
		const { email, password } = req.body;
		const user = await User.findOne({ email });
		if (!user)
			return res.status(400).send({ error: 'Invalid email or password' });
		const validPassword = user.verifyPassword(password);
		if (!validPassword)
			return res.status(400).send({ error: 'Invalid email or password' });
		const token = jwt.sign(
			{ userId: user._id },
			process.env.JWT_SECRET || ''
		);
		res.cookie('accessToken', token, { httpOnly: true, secure: true });
		const { password: userPassword, ...returnedUser } = user.toObject();
		return res.json({
			message: `User ${user.displayName} logged in`,
			user: returnedUser,
		});
	}
);

router.post(
	'/register',
	async (
		req: TypedRequestBody<{
			email: string;
			displayName: string;
			password: string;
		}>,
		res
	) => {
		try {
			const { email, displayName, password } = req.body;
			const existingUser = await User.findOne({ email });
			if (existingUser) {
				return res.status(400).json({ error: 'Email already exists' });
			}

			const salt = await bcrypt.genSalt(10);
			const hashedPassword = await bcrypt.hash(password, salt);
			const user = new User({
				email,
				displayName,
				password: hashedPassword,
			});

			const savedUser = await user.save();
			console.log(`user ${user.displayName} registered successfully`);
			res.json({
				message: 'User registered successfully',
				userId: savedUser._id,
			});
		} catch (error) {
			res.status(500).json({ error: 'Internal server error' });
		}
	}
);

export default router;
