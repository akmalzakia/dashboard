import { createBrowserRouter } from 'react-router-dom';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard/Dashboard';
import Overview from '../pages/Dashboard/Overview';
import Register from '../pages/Register';
import ProtectedRoute from '../pages/ProtectedRoute';

const router = createBrowserRouter([
	{
		path: '/',
		element: (
			<ProtectedRoute>
				<Dashboard />
			</ProtectedRoute>
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
