import { Status } from './enums';

export interface User extends SimpleUser {
	isAdmin: boolean;
}

export interface SimpleUser {
	_id: string;
	displayName: string;
	email: string;
}

export interface Ticket {
	_id: string;
	id: string;
	title: string;
	createdAt: string;
	createdBy: SimpleUser;
	status: Status;
	description: string;
}
