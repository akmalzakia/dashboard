import { useQuery } from '@tanstack/react-query';
import Card from '../../components/Card';
import { getTicket } from '../../api/Ticket';
import TicketItem from './components/TicketItem';

function Tickets() {
	const { data: tickets } = useQuery({
		queryKey: ['Tickets'],
		queryFn: () => getTicket(),
	});
	return (
		<div className='p-4 text-text-primary'>
			<Card>
				<span className='font-bold'>Tickets</span>
				<table className='mt-5 text-left w-full' cellPadding={10}>
					<thead>
						<tr>
							<th>#</th>
							<th>ID</th>
							<th>Issue</th>
							<th>Status</th>
							<th>Created by</th>
							<th>Assignee</th>
						</tr>
					</thead>
					<tbody className='bg-background'>
						{tickets?.map((ticket, index) => (
							<TicketItem
								index={index}
								key={ticket._id}
								ticket={ticket}
							/>
						))}
					</tbody>
				</table>
			</Card>
		</div>
	);
}

export default Tickets;
