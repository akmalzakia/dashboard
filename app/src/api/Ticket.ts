import axios from 'axios';

export async function getTicketStatusCount(status: string) {
	try {
		const res = await axios.get('/api/tickets', {
			params: {
				status,
        fields: 'totalItems'
			},
		});

		return res.data.totalItems;
	} catch (error) {
		console.log(error);
	}
}
