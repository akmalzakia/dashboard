import Card from '../../components/Card';
import { Status } from '../../utils/enums';
import ChartElement from './components/ChartElement';
import LatestActivityCard from './components/LatestActivityCard';
import StatusCard from './components/StatusCard';
import TasksCard from './components/TasksCard';
import UnresolvedTicketsCard from './components/UnresolvedTicketsCard';

function Overview() {
	return (
		<div className='w-full p-5 flex flex-col gap-4'>
			<div className='flex gap-4'>
				<StatusCard status={Status.Unresolved} className='flex-1' />
				<StatusCard status={Status.Resolved} className='flex-1' />
				<StatusCard status={Status.Open} className='flex-1' />
				<StatusCard status={Status.OnHold} className='flex-1' />
			</div>
			<div className='flex gap-4'>
				<Card className='relative w-[800px] h-[400px]'>
					<ChartElement />
				</Card>
				<LatestActivityCard className='flex-1' />
			</div>
			<div className='flex gap-4'>
				<UnresolvedTicketsCard className='w-1/2' />
				<TasksCard className='w-1/2' />
			</div>
		</div>
	);
}

export default Overview;
