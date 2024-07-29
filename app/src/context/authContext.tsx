import { createContext, PropsWithChildren, useState } from 'react';
import { Nullish } from 'utility-types';

export interface AuthContextProps {
	auth: boolean;
	setAuth: (auth: boolean) => void;
}

export const AuthContext = createContext<AuthContextProps | Nullish>(null);
export function AuthProvider({ children }: PropsWithChildren) {
	const [authenticated, setAuthenticated] = useState(false);


	return (
		<AuthContext.Provider value={{ auth, setAuth }}>
			{children}
		</AuthContext.Provider>
	);
}
