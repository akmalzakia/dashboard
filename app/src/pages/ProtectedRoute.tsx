import { Navigate, Outlet } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getCurrentUser } from '../api/User';

interface Props extends React.PropsWithChildren {
	redirectPath?: string;
}

const ProtectedRoute = ({ redirectPath = '/login', children }: Props) => {
	const queryClient = useQueryClient();
	const isLogged = queryClient.getQueryData(['user']);

	const { isError, isSuccess } = useQuery({
		queryKey: ['user'],
		queryFn: async () => await getCurrentUser(),
		enabled: !isLogged,
		retry: false,
	});

	if (isError) return <Navigate to={redirectPath} replace />;

	if (isSuccess) {
		return children ? children : <Outlet />;
	} else {
		return <></>;
	}
};

export default ProtectedRoute;
