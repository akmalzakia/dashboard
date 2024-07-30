import { Response } from 'express';
import User from '../models/user';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { TypedRequestBody } from '../utils/types';

async function LoginController(
	req: TypedRequestBody<{ email: string; password: string }>,
	res: Response
) {
	const { email, password } = req.body;
	const user = await User.findOne({ email });
	if (!user)
		return res.status(400).send({ error: 'Invalid email or password' });
	const validPassword = user.verifyPassword(password);
	if (!validPassword)
		return res.status(400).send({ error: 'Invalid email or password' });
	const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || '');
	res.cookie('accessToken', token, { httpOnly: true, secure: true });
	const { password: userPassword, ...returnedUser } = user.toObject();
	return res.json({
		message: `User ${user.displayName} logged in`,
		user: returnedUser,
	});
}

async function RegisterController(
	req: TypedRequestBody<{
		email: string;
		displayName: string;
		password: string;
	}>,
	res: Response
) {
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

export { LoginController, RegisterController };
