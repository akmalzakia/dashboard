import { createBrowserRouter } from 'react-router-dom';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard/Dashboard';
import Overview from '../pages/Dashboard/Overview';
import Register from '../pages/Register';
import { UserProvider } from '../context/userContext';

const router = createBrowserRouter([
	{
		path: '/',
		element: (
			<UserProvider>
				<Dashboard />
			</UserProvider>
		),
		children: [
			{
				index: true,
				element: <Overview />,
			},
			{
				path: '/tickets',
				element: <></>,
			},
		],
	},
	{
		path: '/login',
		element: <Login />,
	},
	{
		path: '/register',
		element: <Register />,
	},
]);

export default router;
