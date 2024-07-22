import { useState } from 'react';
import Card from '../../../components/Card';
import { tasksData } from '../../../mocks/data';
import { formatDate } from '../../../utils/helper';
import StatusLabel from '../../../components/StatusLabel';

interface TasksCardProps {
	className?: string;
}

function TasksCard({ className }: TasksCardProps) {
	const [data, setData] = useState(tasksData);

	return (
		<Card className={`text-text-primary p-0 ${className}`}>
			<div className='font-bold mb-3 p-2'>Tasks</div>
			{data.map((d) => (
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
						by {d.createdBy.name}, created {formatDate(d.timestamp)}
					</div>
				</div>
			))}
		</Card>
	);
}

export default TasksCard;
