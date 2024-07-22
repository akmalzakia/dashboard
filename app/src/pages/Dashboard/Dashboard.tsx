import { FaBars } from 'react-icons/fa6';
import Sidenav from './components/Sidenav';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import useScreen from '../../hooks/useScreen';
import Topbar from './components/Topbar';

function Dashboard() {
	const [isSidenavOpen, setIsSidenavOpen] = useState(false);
	const { isMobile } = useScreen();

	return (
		<div className='h-full w-full flex overflow-hidden bg-background'>
			{isMobile ? (
				<>
					{isSidenavOpen && (
						<div className='w-1/2 flex-shrink-0'>
							<Sidenav />
						</div>
					)}
					<div className='w-full flex-shrink-0 relative overflow-y-scroll'>
						{isSidenavOpen && (
							<div
								className='absolute bg-black top-0 left-0 right-0 bottom-0 opacity-40'
								onClick={() => {
									setIsSidenavOpen(false);
								}}></div>
						)}
						<Outlet />
					</div>
				</>
			) : (
				<>
					<div className='max-w-48 w-1/5 flex-shrink-0'>
						<Sidenav />
					</div>
					<div className='flex-1 overflow-y-scroll'>
						<Topbar />
						<Outlet />
					</div>
				</>
			)}

			{isMobile && !isSidenavOpen && (
				<button
					className='fixed w-10 h-10 rounded-full p-2 bottom-5 right-5 bg-primary shadow-md'
					onClick={() => {
						setIsSidenavOpen(true);
					}}>
					<FaBars className='m-auto text-white' />
				</button>
			)}
		</div>
	);
}

export default Dashboard;
