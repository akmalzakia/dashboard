import { Response } from 'express';
import { JwtRequest } from '../utils/types';
import Ticket, { ITicket } from '../models/ticket';

async function getTickets(req: JwtRequest, res: Response) {
	try {
		const tickets = await Ticket.find().populate({
			path: 'createdBy',
			select: 'id displayName email',
		});
		res.status(200).json({
			tickets,
		});
	} catch (error) {
		console.error(error);
		res.status(400).json({
			message: 'Failed to fetch tickets',
		});
	}
}

async function getTicketById(req: JwtRequest, res: Response) {
	try {
		const ticket = await Ticket.findById(req.params.id).populate({
			path: 'createdBy',
			select: 'id displayName email',
		});
		res.status(200).json({
			ticket,
		});
	} catch (error) {
		console.error(error);
		res.status(400).json({
			message: 'Failed to fetch tickets',
		});
	}
}

async function addTicket(req: JwtRequest<{ ticket: ITicket }>, res: Response) {
	try {
		const { id, title, description } = req.body.ticket;
		const createdBy = req.userId;
		const ticket = await Ticket.create({
			id,
			createdBy,
			title,
			description,
		});

		ticket.save();
		console.log(`Ticket ${ticket.id} added successfully`);
		res.status(200).json({
			message: 'Post added successfully',
		});
	} catch (error) {
		console.error(error);
		res.status(400).json({
			message: 'Failed to add post',
		});
	}
}

async function updateTicket(
	req: JwtRequest<{ ticket: ITicket }>,
	res: Response
) {
	try {
		const { id, title, description, status } = req.body.ticket ?? {};
		const ticket = await Ticket.findById(req.params.id).populate({
			path: 'createdBy',
			select: 'id displayName email',
		});

		if (id) {
			ticket.id = id;
		}

		if (title) {
			ticket.title = title;
		}

		if (description) {
			ticket.description = description;
		}

		if (status) {
			ticket.status = status;
		}

		ticket.save();

		res.status(200).json({
			message: `Ticket ${ticket.id} updated successfully`,
		});
	} catch (error) {
		console.error(error);
		res.status(400).json({
			message: 'Failed to update ticket',
		});
	}
}

async function deleteTicket(
	req: JwtRequest<{ ticket: ITicket }>,
	res: Response
) {
	try {
		const ticket = await Ticket.findByIdAndDelete(req.params.id).populate({
			path: 'createdBy',
			select: 'id displayName email',
		});
		res.status(200).json({
			message: `Ticket ${ticket.id} successfully deleted`,
		});
	} catch (error) {
		console.error(error);
		res.status(400).json({
			message: 'Failed to delete ticket',
		});
	}
}

export const TicketController = {
	getTickets,
	getTicketById,
	addTicket,
	updateTicket,
	deleteTicket,
};
