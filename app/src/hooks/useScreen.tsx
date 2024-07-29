import { useContext } from 'react';
import { ScreenContext } from '../context/screenContext';

const useScreen = () => {
	const context = useContext(ScreenContext);
	if (!context) {
		throw new Error('ScreenContext must be used within a Provider');
	}

	return context;
};

export default useScreen;
