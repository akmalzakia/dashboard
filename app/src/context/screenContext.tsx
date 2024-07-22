import {
	createContext,
	PropsWithChildren,
	useLayoutEffect,
	useState,
} from 'react';
import { Nullish } from 'utility-types';

export interface ScreenContextType {
	isMobile: boolean;
}

export const ScreenContext = createContext<ScreenContextType | Nullish>(null);

export function ScreenProvider({ children }: PropsWithChildren) {
	const [isMobile, setIsMobile] = useState(false);

	useLayoutEffect(() => {
		function detectIsMobile() {
			const smBreakpoint = 640;
			const isBelowSm = window.innerWidth < smBreakpoint;
			setIsMobile(isBelowSm);
		}
		window.addEventListener('resize', detectIsMobile);
		detectIsMobile();

		return () => window.removeEventListener('resize', detectIsMobile);
	}, []);

	return (
		<ScreenContext.Provider value={{ isMobile }}>
			{children}
		</ScreenContext.Provider>
	);
}
