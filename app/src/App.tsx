import { RouterProvider } from 'react-router-dom';
import router from './router/router';
import useTheme from './hooks/useTheme';
import { defaultTextClasses } from './constants/classHelper';

function App() {
	const { isDark } = useTheme();
	return (
		<div
			className={`w-full h-full ${isDark && 'dark'} ${defaultTextClasses}`}>
			<RouterProvider router={router}></RouterProvider>
		</div>
	);
}

export default App;
