import Card from '../../../components/Card';
import { formatDate } from '../../../utils/helper';
import { getTicket } from '../../../api/Ticket';
import { Status } from '../../../utils/enums';
import { useQuery } from '@tanstack/react-query';
import Loader from '../../../components/Loader';

interface OpenTicketsCardProps {
	className?: string;
}

function OpenTicketsCard({ className }: OpenTicketsCardProps) {
	const { isLoading, data: tickets } = useQuery({
		queryKey: ['Open tickets'],
		queryFn: () => getTicket(Status.Open, 5),
	});

	function getDate(date: string) {
		const d = new Date(date).getTime();
		return formatDate(d);
	}

	return (
		<Card className={`${className} p-0 text-text-primary flex flex-col`}>
			<div className='font-bold mb-3 p-2'>Open Tickets</div>
			{isLoading ? (
				<Loader size={30} className='m-auto' />
			) : (
				tickets &&
				tickets.map((ticket) => (
					<div
						key={ticket.id}
						className='flex flex-col gap-1 border-t-[1.5px] border-t-divider p-2'>
						<div className='flex items-center gap-2'>
							<div className='text-sm font-bold'>{ticket.id}</div>
							<div className='text-sm line-clamp-1'>{ticket.title}</div>
						</div>
						<div className='self-start text-xs text-text-secondary line-clamp-1'>
							by {ticket.createdBy.displayName}, created{' '}
							{getDate(ticket.createdAt)}
						</div>
					</div>
				))
			)}
		</Card>
	);
}

export default OpenTicketsCard;
