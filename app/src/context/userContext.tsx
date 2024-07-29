import { createContext, PropsWithChildren, useState } from 'react';
import { Nullish } from 'utility-types';

export interface User {
	displayName: string;
	email: string;
	isAdmin: boolean;
}

export interface UserContextProps {
	user: User | Nullish;
	setUser: (user: User) => void;
}

export const UserContext = createContext<UserContextProps | Nullish>(null);
export function UserProvider({ children }: PropsWithChildren) {
	const [user, setUser] = useState<User | Nullish>(null);

	return (
		<UserContext.Provider value={{ user, setUser }}>
			{children}
		</UserContext.Provider>
	);
}
