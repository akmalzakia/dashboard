import { PropsWithChildren } from 'react';
import { NavLink } from 'react-router-dom';

interface NavItemProps extends PropsWithChildren {
	to: string;
}

function NavItem({ to, children }: NavItemProps) {
	return (
		<NavLink
			to={to}
			className={({ isActive }) =>
				`p-2 flex items-center gap-3 ${isActive && 'from-navbar/100 to-primary/10 bg-gradient-to-r text-primary border-r-[3px] border-primary'}`
			}>
			{children}
		</NavLink>
	);
}

export default NavItem;
