import { RouterProvider } from 'react-router-dom';
import router from './router/router';
import useTheme from './hooks/useTheme';
import { ScreenProvider } from './context/screenContext';
import { UserProvider } from './context/userContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
	const { isDark } = useTheme();
	return (
		<div className={`w-full h-full ${isDark && 'dark'}`}>
			<QueryClientProvider client={queryClient}>
				<ScreenProvider>
					<UserProvider>
						<RouterProvider router={router}></RouterProvider>
					</UserProvider>
				</ScreenProvider>
			</QueryClientProvider>
		</div>
	);
}

export default App;
