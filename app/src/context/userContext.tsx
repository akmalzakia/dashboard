import { createContext, PropsWithChildren, useState } from 'react';
import { Nullish } from 'utility-types';

export interface User {
	_id: string;
	displayName: string;
	email: string;
	isAdmin: boolean;
}

export interface UserContextProps {
	user?: User;
	setUser: (user: User) => void;
}

export const UserContext = createContext<UserContextProps | Nullish>(null);
export function UserProvider({ children }: PropsWithChildren) {
	const [user, setUser] = useState<User | Nullish>(null);

	if (user) {
		return (
			<UserContext.Provider value={{ user, setUser }}>
				{children}
			</UserContext.Provider>
		);
	}

	return (
		<UserContext.Provider value={{ setUser }}>
			{children}
		</UserContext.Provider>
	);
}
