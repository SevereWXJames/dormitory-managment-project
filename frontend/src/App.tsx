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
import {AdminDashboardPage} from "./pages/common/buildingManager/AdminDashboardPage.tsx";
import {AdminFacilitiesPage} from "./pages/common/buildingManager/AdminFacilitiesPage.tsx";
import {AdminMaintenancePage} from "./pages/common/buildingManager/AdminMaintenancePage.tsx";
import {AdminNoticesPage} from "./pages/common/buildingManager/AdminNoticesPage.tsx";
import {AdminResidentsPage} from "./pages/common/buildingManager/AdminResidentsPage.tsx";
import {AdminSettingsPage} from "./pages/common/buildingManager/AdminSettingsPage.tsx";
import {AdminHelpPage} from "./pages/common/buildingManager/AdminHelpPage.tsx";

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
                {/* Resident-only: */}
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/dashboard" element={<DashboardPage/>}/>
                <Route path="/facilities" element={<LaundryBookingsPage/>}/>
                <Route path="/maintenance" element={<MaintenanceRequestsPage/>}/>
                <Route path="/help" element={<HelpPage/>}/>
                <Route path="/notices" element={<NoticesPage/>}/>
                <Route path="/credits" element={<CreditsPage/>}/>
                <Route path="/settings" element={<SettingsPage/>}/>

                {/* Building manager routes */}
                <Route path="/admin" element={<AdminDashboardPage/>}/>
                <Route path="/admin/dashboard" element={<AdminDashboardPage/>}/>
                <Route path="/admin/facilities" element={<AdminFacilitiesPage/>}/>
                <Route path="/admin/maintenance" element={<AdminMaintenancePage/>}/>
                <Route path="/admin/notices" element={<AdminNoticesPage/>}/>
                <Route path="/admin/residents" element={<AdminResidentsPage/>}/>
                <Route path="/admin/settings" element={<AdminSettingsPage/>}/>
                <Route path="/admin/help" element={<AdminHelpPage/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
