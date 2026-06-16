import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import { HomePage } from './pages/common/HomePage';

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
      	</Routes>
	</BrowserRouter>
  );
}

export default App
