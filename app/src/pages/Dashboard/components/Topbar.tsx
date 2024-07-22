import { FaBell, FaMoon, FaSun } from 'react-icons/fa6';
import useTheme from '../../../hooks/useTheme';

function Topbar() {
	const { isDark, toggleDark } = useTheme();
	return (
		<div className='sticky top-0 w-full bg-topbar flex justify-between p-3 gap-10 shadow-drop text-text-primary z-10'>
			<input
				className='flex-1 bg-searchbar shadow-inner-xl p-1.5 rounded-md placeholder:text-placeholder focus:outline-primary ring-0 focus:outline'
				type='text'
				placeholder='Search'></input>
			<div className='flex gap-6'>
				<button className=''>
					<FaBell></FaBell>
				</button>
				<button className='' onClick={toggleDark}>
					{isDark ? <FaSun /> : <FaMoon />}
				</button>
				<div className='flex items-center gap-2'>
					<div>Akmal Zaki</div>
					<div className='rounded-full w-8 h-8 bg-primary'></div>
				</div>
			</div>
		</div>
	);
}

export default Topbar;
