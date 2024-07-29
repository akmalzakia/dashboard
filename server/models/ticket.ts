import mongoose, { Model, Schema, Types } from 'mongoose';
import { ISimpleUser } from './user';

export enum TicketStatus {
	Unresolved = 'unresolved',
	Resolved = 'resolved',
	Open = 'open',
	OnHold = 'onHold',
}

export interface ITicket {
	id: string;
	title: string;
	createdBy: ISimpleUser;
	status: TicketStatus;
	description: string;
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
	},
	{ timestamps: true }
);

const Ticket = mongoose.model('Ticket', ticketSchema);

export default Ticket;
