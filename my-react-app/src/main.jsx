import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { RoutineUserProvider } from './providers/RoutineUserContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
		<BrowserRouter>
			<RoutineUserProvider>
					<App />
			</RoutineUserProvider>
		</BrowserRouter>
  </React.StrictMode>,
)
