import { RequestHandler } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { JwtRequest } from '../utils/types';
interface UserJwt extends JwtPayload {
	userId: string;
}

export const JWTAuthMiddleware: RequestHandler = (
	req: JwtRequest,
	res,
	next
) => {
	const token: string = req.cookies.accessToken;
	try {
		if (!token) {
			return res.status(403).json({ message: 'User not authorized' });
		}
		jwt.verify(token, process.env.JWT_SECRET, (err, payload: UserJwt) => {
			if (err)
				return res.status(403).json({ message: 'Verification failed' });
			req.userId = payload.userId;
			next();
		});
	} catch (error) {
		console.log(error);
		next(error);
	}
};
