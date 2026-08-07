import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CommonFrame } from "../../../components/common/CommonFrame";
import { useAdminData } from "@/pages/common/buildingManager/pageHooks/useAdminData.tsx";
import {AdminAccountCreationDialog} from "@/components/admin/AdminAccountCreation/AdminAccountCreationDialog.tsx";

import {
    useAdminAccountCreationDialog
} from "@/components/admin/AdminAccountCreation/hooks/useAdminAccountCreationDialog.tsx";

interface DashboardData {
    name: string;
    pending_maintenance_count: number;
    urgent_maintenance_count: number;
    open_maintenance_count: number;
    resolved_maintenance_count: number;
}

const initialDashboardData: DashboardData = {
    name: "Building Manager",
    pending_maintenance_count: 0,
    urgent_maintenance_count: 0,
    open_maintenance_count: 0,
    resolved_maintenance_count: 0,
};

const normalizeStatus = (status?: string) => status?.trim().toLowerCase() ?? "";
const isResolvedStatus = (status?: string) => ["completed", "done", "resolved"].includes(normalizeStatus(status));
const isUrgentRequest = (priority?: string) => priority?.trim().toUpperCase() === "HIGH";
const isOpenStatus = (status?: string) => !isResolvedStatus(status);

// Today's priorities intentionally hidden per design

export function AdminDashboardPage() {
    const { loading, error, managerData, maintenanceRequests } = useAdminData();
    const navigate = useNavigate();
    const [activeModal, setActiveModal] = useState<"queue" | null>(null);
    const { openModal } = useAdminAccountCreationDialog();

    const dashboardData: DashboardData = useMemo(() => {
        if (!loading && !error && managerData && maintenanceRequests) {
            return {
                ...initialDashboardData,
                name: managerData.username,
                pending_maintenance_count: maintenanceRequests.length,
                urgent_maintenance_count: maintenanceRequests.filter((request) => isUrgentRequest(request.priority)).length,
                open_maintenance_count: maintenanceRequests.filter((request) => isOpenStatus(request.status)).length,
                resolved_maintenance_count: maintenanceRequests.filter((request) => isResolvedStatus(request.status)).length,
            };
        }
        return initialDashboardData;
    }, [loading, error, managerData, maintenanceRequests]);


    const handleOpenMaintenance = () => {
        setActiveModal(null);
        navigate("/admin/maintenance");
    };

    return (
        <CommonFrame commonFrameType="BUILDING_MANAGER">
            <div className="admin-dashboard-page">
                <div className="admin-page-header">
                    <div>
                        <h1>Building Manager Dashboard</h1>
                        <p>Overview of building activity, maintenance workload, and facility occupancy.</p>
                    </div>
                    <div className="page-actions">
                        <button type="button" className="secondary-button" onClick={() => setActiveModal("queue")}>Review queue</button>
                        <button type="button" className="primary-button" onClick={() => openModal}>Create admin account</button>
                        {/*<button type="button" className="primary-button" onClick={() => navigate('/admin-signup')}>Create admin account</button>*/}
                    </div>
                    <AdminAccountCreationDialog/>
                </div>

                {loading && <p>Loading dashboard data...</p>}
                {error && <p className="form-error">{error}</p>}

                {!loading && !error && (
                    <>
                        <div className="dashboard-grid">
                            <section className="content-card metric-card manager-card">
                                <div className="card-title-row">
                                    <span className="card-icon">👤</span>
                                    <p className="card-label">Manager</p>
                                </div>
                                <h3>{dashboardData.name}</h3>
                                <p>On-site oversight and daily operations</p>
                            </section>

                            <section className="content-card metric-card pending-card">
                                <div className="card-title-row">
                                    <span className="card-icon">⏳</span>
                                    <p className="card-label">Pending review</p>
                                </div>
                                <h3>{dashboardData.open_maintenance_count}</h3>
                                <p>Open work orders waiting for triage.</p>
                            </section>

                            <section className="content-card metric-card urgent-card">
                                <div className="card-title-row">
                                    <span className="card-icon">⚠️</span>
                                    <p className="card-label">Urgent tasks</p>
                                </div>
                                <h3>{dashboardData.urgent_maintenance_count}</h3>
                                <p>High-priority items requiring immediate attention.</p>
                            </section>

                            <section className="content-card metric-card completed-card">
                                <div className="card-title-row">
                                    <span className="card-icon">✅</span>
                                    <p className="card-label">Resolved</p>
                                </div>
                                <h3>{dashboardData.resolved_maintenance_count}</h3>
                                <p>Requests already completed or closed.</p>
                            </section>
                        </div>

                        {/* Today's priorities hidden */}
                    </>
                )}

                {activeModal && (
                    <div className="modal-backdrop" onClick={() => setActiveModal(null)}>
                        <div className="modal-card" onClick={(event) => event.stopPropagation()}>
                            <div className="modal-header">
                                <h3>Maintenance queue</h3>
                                <button type="button" className="icon-button" onClick={() => setActiveModal(null)}>×</button>
                            </div>
                            <p>There are {dashboardData.pending_maintenance_count} maintenance items waiting for review.</p>
                            <div className="list-stack">
                                {(maintenanceRequests ?? []).map((request) => (
                                    <div key={request._id} className="list-item">
                                        <div>
                                            <strong>{request.title || "Maintenance item"}</strong>
                                            <p>{request.location ? `Location: ${request.location}` : "Review this issue for next steps."}</p>
                                        </div>
                                        <span className={
                                            `status-chip ${isResolvedStatus(request.status) ? "status-chip--resolved" : isUrgentRequest(request.priority) ? "status-chip--urgent" : "status-chip--open"}`
                                        }>
                                            {isResolvedStatus(request.status) ? "Resolved" : isUrgentRequest(request.priority) ? "Urgent" : "Open"}
                                        </span>
                                    </div>
                                ))}
                            </div>
                            <div className="modal-actions">
                                <button type="button" className="secondary-button" onClick={() => setActiveModal(null)}>Close</button>
                                <button type="button" className="primary-button" onClick={handleOpenMaintenance}>Open maintenance</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </CommonFrame>
    );
}
