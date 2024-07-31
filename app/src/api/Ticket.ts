import axios from 'axios';
import { Status } from '../utils/enums';
import { Ticket } from '../utils/types';

export async function getTicketStatusCount(status: Status) {
	try {
		const res = await axios.get<{ totalItems: number }>('/api/tickets', {
			params: {
				status,
				fields: 'totalItems',
			},
		});

		return res.data.totalItems;
	} catch (error) {
		console.log(error);
	}
}

export async function getTicket(status?: Status) {
	try {
		const res = await axios.get<{ tickets: Ticket[] }>('/api/tickets', {
			params: {
				status,
			},
		});
		return res.data.tickets;
	} catch (error) {
		console.log(error);
	}
}
