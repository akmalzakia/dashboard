import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './assets/Inter.ttf';
import { ThemeProvider } from './context/themeContext.tsx';
import { ScreenProvider } from './context/screenContext.tsx';
import { UserProvider } from './context/userContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<ThemeProvider>
			<ScreenProvider>
				<UserProvider>
					<App />
				</UserProvider>
			</ScreenProvider>
		</ThemeProvider>
	</React.StrictMode>
);
