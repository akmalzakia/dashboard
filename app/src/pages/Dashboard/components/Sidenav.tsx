import Logo from '../../../components/Logo';
import { FaChartPie, FaTicket } from 'react-icons/fa6';
import NavItem from './NavItem';

function Sidenav() {
	return (
		<div className={`bg-navbar flex flex-col h-full py-4 shadow-md gap-6 sm:text-xs md:text-base text-text-alt text-text-primary`}>
			<div className='flex items-center gap-3 px-2'>
				<div className='bg-white rounded-full p-1'>
					<Logo width={24} height={24} />
				</div>
				<div className='font-bold'>Dashboard Kit</div>
			</div>
			<div className='flex-1 flex flex-col'>
				<NavItem to='/'>
					<FaChartPie />
					<div>Overview</div>
				</NavItem>
				<NavItem to='/tickets'>
					<FaTicket />
					<div>Tickets</div>
				</NavItem>
			</div>
		</div>
	);
}

export default Sidenav;
