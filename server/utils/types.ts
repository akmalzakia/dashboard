import { Request } from 'express';

export interface TypedRequestBody<T> extends Request {
	body: T;
}

export interface JwtRequest<T = any> extends TypedRequestBody<T> {
	userId?: string;
}
