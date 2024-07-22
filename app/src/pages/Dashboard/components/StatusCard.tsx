import Card from '../../../components/Card';
import { Status } from '../../../enums/enums';
import { startCase } from 'lodash';
import { statusVariantClasses } from '../../../utils/helper';

interface StatusCardProps {
	status: Status;
	className?: string;
}

function StatusCard({ status, className }: StatusCardProps) {
	return (
		<Card
			className={`border font-bold ${statusVariantClasses[status]} ${
				className ?? ''
			}`}>
			<div className='text-center'>{startCase(status)}</div>
			<div className='text-center'>70</div>
		</Card>
	);
}

export default StatusCard;
