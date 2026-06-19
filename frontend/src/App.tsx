import {BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.css'
import {HomePage} from './pages/common/HomePage';
import {LoginPage} from './pages/common/LoginPage';
import {DashboardPage} from './pages/common/residents/dashboard/DashboardPage';
import {LaundryBookingsPage} from "./pages/common/residents/dashboard/dynamic/LaundryBookingsPage.tsx";
import {MaintenanceRequestsPage} from "./pages/common/residents/dashboard/dynamic/MaintenanceRequestsPage.tsx";
import {NoticesPage} from "./pages/common/residents/dashboard/dynamic/NoticesPage.tsx";
import {CreditsPage} from "./pages/common/residents/dashboard/dynamic/CreditsPage.tsx";
import {SettingsPage} from "./pages/common/residents/dashboard/static/SettingsPage.tsx";
import {HelpPage} from "./pages/common/residents/dashboard/static/HelpPage.tsx";

/**
 * App React component, containing routes to other pages.
 *
 * @returns JSX for the App component.
 */
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                //Resident-only:
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/dashboard/" element={<DashboardPage/>}/>
                <Route path="/facilities" element={<LaundryBookingsPage/>}/>
                <Route path="/maintenance" element={<MaintenanceRequestsPage/>}/>
                <Route path="/help" element={<HelpPage/>}/>
                <Route path="/notices" element={<NoticesPage/>}/>
                <Route path="/credits" element={<CreditsPage/>}/>
                <Route path="/settings" element={<SettingsPage/>}/>
                <Route path="/login" element={<LoginPage/>}/>

            </Routes>
        </BrowserRouter>
    );
}

export default App;
