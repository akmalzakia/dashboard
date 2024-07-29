import { useContext } from 'react';
import { AuthContext } from '../context/authContext';

const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('AuthContext must be used within a Provider');
	}

	return context;
};

export default useAuth;
