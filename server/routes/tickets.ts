import express from 'express';
import { JWTAuthMiddleware, JwtRequest } from '../middlewares/auth';
import User from '../models/user';
import Ticket, { ITicket, TicketStatus } from '../models/ticket';
const router = express.Router();

router.get('/tickets', JWTAuthMiddleware, async (req: JwtRequest, res) => {
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
});

router.get('/tickets/:id', JWTAuthMiddleware, async (req: JwtRequest, res) => {
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
});

interface TicketRequest extends JwtRequest {
	ticket: ITicket;
}

router.post('/tickets', JWTAuthMiddleware, async (req: TicketRequest, res) => {
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
});

router.put(
	'/tickets/:id',
	JWTAuthMiddleware,
	async (req: TicketRequest, res) => {
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
);

interface TicketRequest extends JwtRequest {
	ticket: ITicket;
}

router.delete(
	'/tickets/:id',
	JWTAuthMiddleware,
	async (req: JwtRequest, res) => {
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
);

interface TicketRequest extends JwtRequest {
	ticket: ITicket;
}

export default router;
