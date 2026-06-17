import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import { HomePage } from './pages/common/HomePage';
import { LoginPage } from './pages/common/LoginPage';
import { DashboardPage } from './pages/common/residents/dashboard/DashboardPage';

/**
 * App React component, containing routes to other pages.
 * 
 * @returns JSX for the App component.
 */
function App() {
  return (
    <BrowserRouter>
		<Routes>
            <Route path="/" element={<HomePage />} />
			<Route path="/login" element={<LoginPage />} />
			<Route path="/dashboard" element={<DashboardPage />} />
      	</Routes>
	</BrowserRouter>
  );
}

export default App;
