import { Outlet, useNavigate } from 'react-router-dom';
import useUser from '../hooks/useUser';
import { useEffect } from 'react';
import axios, { CancelTokenSource } from 'axios';

interface Props extends React.PropsWithChildren {
	redirectPath?: string;
}

const ProtectedRoute = ({ redirectPath = '/login', children }: Props) => {
	const { user, setUser } = useUser();
	const navigate = useNavigate();

	useEffect(() => {
		let cancelToken: CancelTokenSource;
		async function getUser() {
			cancelToken = axios.CancelToken.source();
			try {
				const res = await axios.get('/api/user', {
					withCredentials: true,
					cancelToken: cancelToken.token,
				});

				setUser(res.data.user);
			} catch (error) {
				if (axios.isAxiosError(error)) {
					const errResponse = error.response;
					if (errResponse?.status === 403) {
						console.log(errResponse.data.message);
						navigate(redirectPath, { replace: true });
					}
				} else {
					console.log(error);
					navigate(redirectPath, { replace: true });
				}
			}
		}

		if (!user) getUser();

		return () => {
			if (cancelToken) {
				cancelToken.cancel();
			}
		};
	}, [user, setUser, navigate, redirectPath]);

	return children ? children : <Outlet />;
};

export default ProtectedRoute;
