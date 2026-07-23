import {Route, Routes} from 'react-router-dom';
import './App.css'
import {HomePage} from './pages/common/HomePage';
import {LoginPage} from './pages/common/LoginPage';
import {DashboardPage} from './pages/common/residents/dashboard/DashboardPage';
import {LaundryBookingsPage} from "./pages/common/residents/dashboard/dynamic/LaundryBookingsPage.tsx";
import {MaintenanceRequestsPage} from "./pages/common/residents/dashboard/dynamic/MaintenanceRequestsPage.tsx";
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
import {AdminAccessCodesPage} from "./pages/common/buildingManager/AdminAccessCodesPage.tsx";
import CssBaseline from "@mui/material/CssBaseline";
import {ResidentSignUpPage} from "@/pages/common/residents/ResidentSignUpPage.tsx";
import {AdminSignUpPage} from "@/pages/common/buildingManager/AdminSignUpPage.tsx";
import {UnauthorizedPage} from "@/pages/UnauthorizedPage.tsx";
import {ProtectedRoute} from "@/components/common/Auth/ProtectedRoute.tsx";
import {Role} from "@/dataTypes/user.ts";
import {Toaster} from "@/components/ui/sonner.tsx";
import {useEffect} from "react";
import {useRefreshMutation} from "@/context/api/apiServices/authApi.ts";

/**
 * App React component, containing routes to other pages.
 *
 * @returns JSX for the App component.
 */
function App() {
    const [refresh, {isLoading, isUninitialized}]= useRefreshMutation(); // calls /refresh upon mounting

    useEffect(() => {
        refresh();}, [refresh]);

    if (isLoading || isUninitialized) return <p>Loading...</p>;
    return (
        <>
            <CssBaseline/>
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/unauthorized" element={<UnauthorizedPage/>}/>

                    {/* Resident-only: */}
                    <Route path="/resident-signup" element={<ResidentSignUpPage/>}/>
                    <Route path="/dashboard" element={
                        <ProtectedRoute allowedRoles={[Role.RESIDENT]}>
                            <Toaster/>
                            <DashboardPage/>
                        </ProtectedRoute>
                    }/>
                    <Route path="/facilities" element={
                        <ProtectedRoute allowedRoles={[Role.RESIDENT]}>
                            <LaundryBookingsPage/>
                        </ProtectedRoute>
                    }/>
                    <Route path="/maintenance" element={
                        <ProtectedRoute allowedRoles={[Role.RESIDENT]}>
                            <MaintenanceRequestsPage/>
                        </ProtectedRoute>
                    }/>
                    <Route path="/help" element={
                        <ProtectedRoute allowedRoles={[Role.RESIDENT]}>
                            <HelpPage/>
                        </ProtectedRoute>
                    }/>
                    <Route path="/credits" element={
                        <ProtectedRoute allowedRoles={[Role.RESIDENT]}>
                            <CreditsPage/>
                        </ProtectedRoute>
                    }/>
                    <Route path="/settings" element={
                        <ProtectedRoute allowedRoles={[Role.RESIDENT]}>
                            <SettingsPage/>
                        </ProtectedRoute>
                    }/>

                    {/* Building manager routes */}
                    <Route path="/admin-signup" element={<AdminSignUpPage/>}/>
                    <Route path="/admin" element={
                        <ProtectedRoute allowedRoles={[Role.ADMIN]}>
                            <AdminDashboardPage/>
                        </ProtectedRoute>
                    }/>
                    <Route path="/admin/dashboard" element={
                        <ProtectedRoute allowedRoles={[Role.ADMIN]}>
                            <AdminDashboardPage/>
                        </ProtectedRoute>
                    }/>
                    <Route path="/admin/facilities" element={
                        <ProtectedRoute allowedRoles={[Role.ADMIN]}>
                            <AdminFacilitiesPage/>
                        </ProtectedRoute>
                    }/>
                    <Route path="/admin/maintenance" element={
                        <ProtectedRoute allowedRoles={[Role.ADMIN]}>
                            <AdminMaintenancePage/>
                        </ProtectedRoute>
                    }/>
                    <Route path="/admin/notices" element={
                        <ProtectedRoute allowedRoles={[Role.ADMIN]}>
                            <AdminNoticesPage/>
                        </ProtectedRoute>
                    }/>
                    <Route path="/admin/residents" element={
                        <ProtectedRoute allowedRoles={[Role.ADMIN]}>
                            <AdminResidentsPage/>
                        </ProtectedRoute>
                    }/>
                    <Route path="/admin/access-codes" element={
                        <ProtectedRoute allowedRoles={[Role.ADMIN]}>
                            <AdminAccessCodesPage/>
                        </ProtectedRoute>
                    }/>
                    <Route path="/admin/settings" element={
                        <ProtectedRoute allowedRoles={[Role.ADMIN]}>
                            <AdminSettingsPage/>
                        </ProtectedRoute>
                    }/>
                    <Route path="/admin/help" element={
                        <ProtectedRoute allowedRoles={[Role.ADMIN]}>
                            <AdminHelpPage/>
                        </ProtectedRoute>
                    }/>
                </Routes>
        </>

    );
}

export default App;
