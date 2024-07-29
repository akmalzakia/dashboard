import { useContext } from 'react';
import { ThemeContext } from '../context/themeContext';

const useTheme = () => {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error('ThemeContext must be used within a Provider');
	}

	return context;
};

export default useTheme;
