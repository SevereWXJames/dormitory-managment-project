import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CommonFrame } from "../../../components/common/CommonFrame";
import { useAdminData } from "@/pages/common/buildingManager/pageHooks/useAdminData.tsx";

interface DashboardData {
    name: string;
    pending_maintenance_count: number;
}

const initialDashboardData: DashboardData = {
    name: "Building Manager",
    pending_maintenance_count: 0,
};

// Today's priorities intentionally hidden per design

export function AdminDashboardPage() {
    const { loading, error, managerData, maintenanceRequests } = useAdminData();
    const navigate = useNavigate();
    const [activeModal, setActiveModal] = useState<"queue" | null>(null);

    const dashboardData: DashboardData = useMemo(() => {
        if (!loading && !error && managerData && maintenanceRequests) {
            return {
                ...initialDashboardData,
                name: managerData.username,
                pending_maintenance_count: maintenanceRequests.length,
            };
        }
        return initialDashboardData;
    }, [loading, error, managerData, maintenanceRequests]);

    const handleReviewResidents = () => {
        navigate("/admin/residents");
    };

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
                        <button type="button" className="secondary-button" onClick={handleReviewResidents}>Review residents</button>
                    </div>
                </div>

                {loading && <p>Loading dashboard data...</p>}
                {error && <p className="form-error">{error}</p>}

                {!loading && !error && (
                    <>
                        <div className="dashboard-grid">
                            <section className="content-card metric-card">
                                <p className="card-label">Manager</p>
                                <h3>{dashboardData.name}</h3>
                                <p>On-site oversight and daily operations</p>
                            </section>

                            <section className="content-card metric-card">
                                <p className="card-label">Pending maintenance</p>
                                <h3>{dashboardData.pending_maintenance_count}</h3>
                                <p>Open work orders waiting for triage</p>
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
                                {(maintenanceRequests ?? []).slice(0, 3).map((request) => (
                                    <div key={request._id} className="list-item">
                                        <div>
                                            <strong>{request.title || "Maintenance item"}</strong>
                                            <p>{request.location ? `Location: ${request.location}` : "Review this issue for next steps."}</p>
                                        </div>
                                        <span className="status-chip">Open</span>
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
