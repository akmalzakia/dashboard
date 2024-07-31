import { startCase } from 'lodash';
import { Status } from '../utils/enums';
import { statusVariantClasses } from '../utils/helper';

interface StatusLabelProps {
	status: Status;
	className?: string;
}

function StatusLabel({ status, className }: StatusLabelProps) {
	return (
		<div
			className={`${statusVariantClasses[status]} border-2 rounded-xl px-2 text-xs font-bold ${className}`}>
			{startCase(status)}
		</div>
	);
}

export default StatusLabel;
