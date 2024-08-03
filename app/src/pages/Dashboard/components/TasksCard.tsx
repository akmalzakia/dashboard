import Card from '../../../components/Card';
import { formatDate } from '../../../utils/helper';
import StatusLabel from '../../../components/StatusLabel';
import { getTicket } from '../../../api/Ticket';
import useUser from '../../../hooks/useUser';
import { useQuery } from '@tanstack/react-query';

interface TasksCardProps {
	className?: string;
}

function TasksCard({ className }: TasksCardProps) {
	const { user } = useUser();
	const { data: tickets } = useQuery({
		queryKey: ['Tasks'],
		queryFn: async () => {
			if (!user) return null;
			const res = await getTicket(undefined, 5, user._id);
			return res;
		},
		enabled: !!user,
	});

	function getDate(date: string) {
		const d = new Date(date).getTime();
		return formatDate(d);
	}

	return (
		<Card className={`text-text-primary p-0 ${className}`}>
			<div className='font-bold mb-3 p-2'>Tasks</div>
			{tickets &&
				tickets.map((d) => (
					<div
						key={d.id}
						className='flex flex-col gap-1 border-t-[1.5px] border-t-divider p-2'>
						<div className='flex items-center justify-between'>
							<div className='flex gap-1'>
								<div className='text-sm font-bold'>{d.id}</div>
								<div className='text-sm line-clamp-1'>{d.title}</div>
							</div>
							<StatusLabel status={d.status} />
						</div>
						<div className='self-start text-xs text-text-secondary line-clamp-1'>
							by {d.createdBy.displayName}, created{' '}
							{getDate(d.createdAt)}
						</div>
					</div>
				))}
		</Card>
	);
}

export default TasksCard;
