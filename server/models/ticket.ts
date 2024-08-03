import mongoose, { Model, Schema, Types } from 'mongoose';
import { ISimpleUser } from './user';

export enum TicketStatus {
	OnProgress = 'onprogress',
	Resolved = 'resolved',
	Open = 'open',
	OnHold = 'onHold',
}

export interface ITicket {
	id: string;
	title: string;
	createdBy: ISimpleUser;
	createdAt: Date;
	status: TicketStatus;
	description: string;
	assignee: ISimpleUser;
}

const ticketSchema = new Schema<ITicket, Model<ITicket>>(
	{
		id: {
			type: String,
			required: true,
		},
		title: {
			type: String,
			required: [true, 'Please provide a ticket title'],
		},
		createdBy: {
			type: Types.ObjectId,
			ref: 'User',
			required: true,
		},
		status: {
			type: String,
			enum: Object.values(TicketStatus),
			default: TicketStatus.Open,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		createdAt: {
			type: Date,
			default: Date.now(),
		},
		assignee: {
			type: Types.ObjectId,
			ref: 'User',
		},
	},
	{ timestamps: true }
);

const Ticket = mongoose.model('Ticket', ticketSchema);

export default Ticket;
