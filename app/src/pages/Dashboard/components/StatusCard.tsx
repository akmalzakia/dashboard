import Card from '../../../components/Card';
import { Status } from '../../../enums/enums';
import { startCase } from 'lodash';
import {
	loaderVariantClasses,
	statusVariantClasses,
} from '../../../utils/helper';
import { useQuery } from '@tanstack/react-query';
import { getTicketStatusCount } from '../../../api/Ticket';
import Loader from '../../../components/Loader';

interface StatusCardProps {
	status: Status;
	className?: string;
}

function StatusCard({ status, className }: StatusCardProps) {
	const { isLoading, data } = useQuery({
		queryKey: ['status', status],
		queryFn: async () => await getTicketStatusCount(status),
	});

	return (
		<Card
			className={`border font-bold ${statusVariantClasses[status]} ${
				className ?? ''
			}`}>
			<div className='text-center mb-2'>{startCase(status)}</div>
			{isLoading ? (
				<Loader
					size={24}
					className={`${loaderVariantClasses[status]} mx-auto`}
				/>
			) : (
				<div className='text-center'>{data}</div>
			)}
		</Card>
	);
}

export default StatusCard;
