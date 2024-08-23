import { Ticket } from '../../../utils/types';
import StatusLabel from '../../../components/StatusLabel';

interface TicketItemProps {
	index: number;
	ticket: Ticket;
}

function TicketItem({ index, ticket }: TicketItemProps) {
	return (
		<tr className='border-2 border-divider text-sm'>
			<td className=''>{index + 1}</td>
			<td className=''>{ticket.id}</td>
			<td>{ticket.title}</td>
			<td className=''>
				<StatusLabel className='w-fit' status={ticket.status} />
			</td>
			<td>{ticket.createdBy.displayName}</td>
			<td>{ticket.assignee?.displayName}</td>
		</tr>
	);
}

export default TicketItem;
