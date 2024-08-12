import { useQuery } from '@tanstack/react-query';
import { createContext, PropsWithChildren } from 'react';
import { Nullish } from 'utility-types';
import { getCurrentUser } from '../api/User';
import { Navigate } from 'react-router-dom';

export interface User {
	_id: string;
	displayName: string;
	email: string;
	isAdmin: boolean;
}

interface UserProviderProps extends PropsWithChildren {
	redirectPath?: string;
}

export const UserContext = createContext<User | Nullish>(null);
export function UserProvider({
	redirectPath = '/login',
	children,
}: UserProviderProps) {
	const currentUser = useQuery({
		queryKey: ['user'],
		queryFn: async () => await getCurrentUser(),
		retry: false,
	});

	if (currentUser.isLoading) {
		return <div>loading...</div>;
	}

	if (currentUser.isError) {
		return (
			<>
				<Navigate to={redirectPath} replace />
			</>
		);
	}

	return (
		<UserContext.Provider value={currentUser.data}>
			{children}
		</UserContext.Provider>
	);
}
