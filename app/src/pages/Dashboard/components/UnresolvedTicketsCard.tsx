import { useState } from 'react';
import Card from '../../../components/Card';
import { unresolvedTicketsData } from '../../../mocks/data';
import { formatDate } from '../../../utils/helper';

interface UnresolvedTicketsCardProps {
	className?: string;
}

function UnresolvedTicketsCard({ className }: UnresolvedTicketsCardProps) {
	const [data, setData] = useState(unresolvedTicketsData);
	return (
		<Card className={`${className} p-0 text-text-primary`}>
			<div className='font-bold mb-3 p-2'>Unresolved Tickets</div>
			{data.map((d) => (
				<div
					key={d.id}
					className='flex flex-col gap-1 border-t-[1.5px] border-t-divider p-2'>
					<div className='flex items-center gap-1'>
						<div className='text-sm font-bold'>{d.id}</div>
            <div className='text-sm line-clamp-1'>{d.title}</div>
					</div>
					<div className='self-start text-xs text-text-secondary line-clamp-1'>
						by {d.createdBy.name}, created {formatDate(d.timestamp)}
					</div>
				</div>
			))}
		</Card>
	);
}

export default UnresolvedTicketsCard;
