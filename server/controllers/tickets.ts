import { Response } from 'express';
import { JwtRequest } from '../utils/types';
import Ticket, { ITicket, TicketStatus } from '../models/ticket';

type TicketRequest<Req = any, Q = qs.ParsedQs> = JwtRequest<{}, Req, Q>;
type TicketWithIdRequest<Req = any, Q = qs.ParsedQs> = JwtRequest<
	{ id?: string },
	Req,
	Q
>;

enum TicketQueryFields {
	TotalItems = 'totalItems',
	Tickets = 'tickets',
}

/* need to limit the number of tickets fetched (implement pagination!)
 api should return smth like this 
 {
	...
	totalItems: 99
	page: 1,
	limit: 10,
	next: link to next,
	prev: link to prev,
 }
*/
async function getTickets(
	req: TicketRequest<
		{},
		{
			limit?: number;
			status?: string;
			fields?: string;
			assignee?: string;
			page?: number;
			prev?: string;
			next?: string;
			sort?: string;
		}
	>,
	res: Response
) {
	try {
		const qs = req.query;

		let returnData: Record<string, any>;

		let statusFilter: Record<string, any>;

		statusFilter = qs.status
			? { ...statusFilter, status: qs.status }
			: statusFilter;

		statusFilter = qs.assignee
			? { ...statusFilter, assignee: qs.assignee }
			: statusFilter;

		//TO DO: pagination should be based on sort rather than fixed on id

		if (qs.prev && qs.next) {
			res.status(400).json({
				message: "Next and prev query should not contain in the same request!"
			})

			return;
		}

		if (qs.prev) {
			const [prevTimestamp, prevId] = qs.prev.split('_');
			statusFilter = qs.prev
				? {
						...statusFilter,
						$or: [
							{ createdAt: { $gt: prevTimestamp } },
							{ createdAt: prevTimestamp, _id: { $gt: prevId } },
						],
				  }
				: statusFilter;
		}

		if (qs.next) {
			const [nextTimestamp, nextId] = qs.next.split('_');
			statusFilter = qs.next
				? {
						...statusFilter,
						$or: [
							{ createdAt: { $lt: nextTimestamp } },
							{ createdAt: nextTimestamp, _id: { $lt: nextId } },
						],
				  }
				: statusFilter;
		}

		const fields = qs.fields ? qs.fields.split(',') : null;

		if (!fields || fields.includes(TicketQueryFields.Tickets)) {
			const tickets = await Ticket.find({ ...statusFilter }, null, {
				limit: qs.limit ?? 0,
				lean: false,
			})
				.sort({ createdAt: -1, _id: -1 })
				.populate({
					path: 'createdBy',
					select: 'id displayName email',
				})
				.populate({
					path: 'assignee',
					select: 'id displayName email',
				});
			const firstItem = tickets[0];
			const lastItem = tickets[tickets.length - 1];
			const prev = `${firstItem.createdAt.toISOString()}_${firstItem._id}`;
			const next = `${lastItem.createdAt.toISOString()}_${lastItem._id}`;
			returnData = {
				...returnData,
				tickets,
				prev,
				next,
			};
		}

		if (!fields || fields.includes(TicketQueryFields.TotalItems)) {
			const totalTickets = await Ticket.countDocuments({ ...statusFilter });
			returnData = {
				...returnData,
				totalItems: totalTickets,
			};
		}

		res.status(200).json(returnData);
	} catch (error) {
		console.error(error);
		res.status(400).json({
			message: 'Failed to fetch tickets',
		});
	}
}

async function getTicketById(req: TicketWithIdRequest, res: Response) {
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

async function addTicket(
	req: TicketRequest<{ ticket: ITicket }>,
	res: Response
) {
	try {
		const { id, title, description } = req.body.ticket;
		const createdBy = req.userId;
		const createdAt = new Date();
		const ticket = await Ticket.create({
			id,
			createdBy,
			title,
			description,
			createdAt,
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
	req: TicketWithIdRequest<{ ticket: ITicket }>,
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

async function deleteTicket(req: TicketWithIdRequest, res: Response) {
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

async function getMonthlyTotalTickets(req: TicketRequest, res: Response) {
	try {
		const total: { _id: { status: TicketStatus }; count: number[] }[] =
			await Ticket.aggregate([
				{
					$densify: {
						field: 'createdAt',
						partitionByFields: ['status'],
						range: {
							step: 1,
							unit: 'month',
							bounds: [
								new Date('2024-01-1T00:00:00.000Z'),
								new Date('2024-12-31T08:00:00.000Z'),
							],
						},
					},
				},
			])
				.group({
					_id: {
						status: '$status',
						month: {
							$month: '$createdAt',
						},
					},
					tickets: {
						$push: '$$ROOT',
					},
				})
				.sort({
					'_id.status': 1,
					'_id.month': 1,
				})
				.group({
					_id: {
						status: '$_id.status',
					},
					count: {
						$push: {
							$size: {
								$filter: {
									input: '$tickets',
									as: 'ticket',
									cond: {
										$gte: ['$$ticket._id', null],
									},
								},
							},
						},
					},
				});
		const totalObject = total.reduce((acc, obj) => {
			return { ...acc, [obj._id.status]: obj.count };
		}, {});

		res.status(200).json(totalObject);
	} catch (error) {
		console.error(error);
		res.status(400).json({
			message: 'Failed to get monthly total tickets',
		});
	}
}

export const TicketController = {
	getTickets,
	getTicketById,
	addTicket,
	updateTicket,
	deleteTicket,
	getMonthlyTotalTickets,
};
