import { createBrowserRouter } from 'react-router-dom';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Dashboard />,
	},
	{
		path: '/login',
		element: <Login />,
	},
]);

export default router;
