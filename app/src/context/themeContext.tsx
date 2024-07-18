import { createContext, PropsWithChildren, useState } from 'react';
import { Nullish } from 'utility-types';

export interface ThemeContextType {
	isDark: boolean;
	toggleDark: () => void;
}

export const ThemeContext = createContext<ThemeContextType | Nullish>(null);
export function ThemeProvider({ children }: PropsWithChildren) {
	const [isDark, setTheme] = useState<boolean>(false);

	function toggleDark() {
		setTheme(!isDark);
	}

	return (
		<ThemeContext.Provider value={{ isDark, toggleDark }}>
			{children}
		</ThemeContext.Provider>
	);
}
