import { useContext } from 'react';
import { UserContext } from '../context/userContext';

const useUser = () => {
	const context = useContext(UserContext);
	if (!context) {
		throw new Error('UserContext must be used within a Provider');
	}

	return context;
};

export default useUser;
