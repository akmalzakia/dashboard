import { useState } from 'react';
import { latestActivityData, LatestActivityType } from '../../../mocks/data';
import Card from '../../../components/Card';
import StatusLabel from '../../../components/StatusLabel';
import { Status } from '../../../utils/enums';
import { formatDate } from '../../../utils/helper';

interface LatestActivityCardProps {
	className?: string;
}

function LatestActivityCard({ className }: LatestActivityCardProps) {
	const [data, setData] = useState<LatestActivityType[]>(latestActivityData);

	return (
		<Card className={`text-text-primary ${className} p-0`}>
			<div className='font-bold mb-3 p-2'>Latest Activity</div>
			{data.map((d) => (
				<div
					key={d.id}
					className='flex flex-col gap-1 border-t-[1.5px] border-t-divider p-2'>
					<div className='flex justify-between items-center'>
						<div className='font-bold'>{d.id}</div>
						{d.changes?.status && (
							<div className='flex items-center gap-1'>
								<StatusLabel status={d.changes.status.from} />
								<div className='text-xs'>{'-->'}</div>
								<StatusLabel status={d.changes.status.to} />
							</div>
						)}
					</div>
					<div className='self-start text-sm line-clamp-1'>{d.title}</div>
					<div className='self-end text-xs text-text-secondary line-clamp-1'>
						by {d.modifiedBy.name}, created {formatDate(d.timestamp)}
					</div>
				</div>
			))}
		</Card>
	);
}

export default LatestActivityCard;
