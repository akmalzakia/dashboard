import { createBrowserRouter } from 'react-router-dom';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard/Dashboard';
import Overview from '../pages/Dashboard/Overview';
import Register from '../pages/Register';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Dashboard />,
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
