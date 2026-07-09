import { useMemo, useState } from "react";
import { CommonFrame } from "../../../components/common/CommonFrame";
import { useAdminMaintenanceData } from "@/pages/common/buildingManager/pageHooks/useAdminMaintenanceData.tsx";

type StatusFilter = "All" | "New" | "InProgress" | "Resolved";

export function AdminMaintenancePage() {
    const { loading, error, requests, requestsStatus, requestsTypes } = useAdminMaintenanceData();
    const [activeFilter, setActiveFilter] = useState<StatusFilter>("All");
    const [selectedRequest, setSelectedRequest] = useState<(typeof requests)[number] | null>(null);
    const [statusOverrides, setStatusOverrides] = useState<Record<string, string>>({});

    const filteredRequests = useMemo(() => {
        if (activeFilter === "All") {
            return requests;
        }
        return requests.filter((request) => {
            const displayStatus = statusOverrides[String(request._id)] ?? requestsStatus.find((status) => status._id === request.status)?.text ?? request.status;
            return displayStatus === activeFilter;
        });
    }, [activeFilter, requests, requestsStatus, statusOverrides]);

    const updateStatus = (requestId: string, newStatus: string) => {
        setStatusOverrides((previous) => ({ ...previous, [requestId]: newStatus }));
    };

    return (
        <CommonFrame commonFrameType="BUILDING_MANAGER">
            <div className="admin-maintenance-page">
                <div className="admin-page-header">
                    <div>
                        <h1>Maintenance Requests</h1>
                        <p>Review current work orders and track their status.</p>
                    </div>
                    <div className="page-actions">
                        <button type="button" className="primary-button" onClick={() => setSelectedRequest(requests[0] ?? null)}>New request</button>
                    </div>
                </div>

                {loading && <p>Loading maintenance requests...</p>}
                {error && <p className="form-error">{error}</p>}

                {!loading && !error && (
                    <section className="content-card">
                        <div className="section-title-row">
                            <h2>Active requests</h2>
                            <div className="filter-row">
                                {(["All", "New", "InProgress", "Resolved"] as StatusFilter[]).map((filter) => (
                                    <button
                                        key={filter}
                                        type="button"
                                        className={filter === activeFilter ? "pill-button active" : "pill-button"}
                                        onClick={() => setActiveFilter(filter)}
                                    >
                                        {filter}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>Request ID</th>
                                    <th>Room</th>
                                    <th>Type</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredRequests.map((request) => {
                                    const displayStatus = statusOverrides[String(request._id)] ?? requestsStatus.find((status) => status._id === request.status)?.text ?? request.status;
                                    const displayType = requestsTypes.find((type) => type._id === request.type)?.text ?? request.type;
                                    return (
                                        <tr key={request._id}>
                                            <td>{request._id}</td>
                                            <td>{request.location ?? "N/A"}</td>
                                            <td>{displayType}</td>
                                            <td><span className="status-chip">{displayStatus}</span></td>
                                            <td>
                                                <button type="button" className="text-link" onClick={() => setSelectedRequest(request)}>
                                                    Review
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </section>
                )}

                {selectedRequest && (
                    <div className="modal-backdrop" onClick={() => setSelectedRequest(null)}>
                        <div className="modal-card" onClick={(event) => event.stopPropagation()}>
                            <div className="modal-header">
                                <h3>Request details</h3>
                                <button type="button" className="icon-button" onClick={() => setSelectedRequest(null)}>×</button>
                            </div>
                            <p><strong>ID:</strong> {selectedRequest._id}</p>
                            <p><strong>Location:</strong> {selectedRequest.location ?? "N/A"}</p>
                            <p><strong>Status:</strong> {statusOverrides[String(selectedRequest._id)] ?? requestsStatus.find((status) => status._id === selectedRequest.status)?.text ?? selectedRequest.status}</p>
                            <div className="filter-row">
                                {(["New", "InProgress", "Resolved"] as StatusFilter[]).map((status) => (
                                    <button
                                        key={status}
                                        type="button"
                                        className={status === (statusOverrides[String(selectedRequest._id)] ?? requestsStatus.find((item) => item._id === selectedRequest.status)?.text ?? selectedRequest.status) ? "pill-button active" : "pill-button"}
                                        onClick={() => updateStatus(String(selectedRequest._id), status)}
                                    >
                                        {status}
                                    </button>
                                ))}
                            </div>
                            <div className="modal-actions">
                                <button type="button" className="secondary-button" onClick={() => setSelectedRequest(null)}>Close</button>
                                <button type="button" className="primary-button" onClick={() => setSelectedRequest(null)}>Save update</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </CommonFrame>
    );
}
