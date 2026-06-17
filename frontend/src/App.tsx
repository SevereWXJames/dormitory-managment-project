import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import { HomePage } from './pages/common/HomePage';
import { LoginPage } from './pages/common/LoginPage';

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
      	</Routes>
	</BrowserRouter>
  );
}

export default App
