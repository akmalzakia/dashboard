import { Request } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';

export type TypedRequestBody<T> = Request<
	ParamsDictionary,
	any,
	T,
	qs.ParsedQs
>;

export interface JwtRequest<
	P = ParamsDictionary,
	ReqBody = any,
	Q = qs.ParsedQs
> extends Request<P, any, ReqBody, Q> {
	userId?: string;
}
