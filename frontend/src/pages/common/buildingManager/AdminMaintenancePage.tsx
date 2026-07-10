import { useMemo, useState } from "react";
import { CommonFrame } from "../../../components/common/CommonFrame";
import { useAdminMaintenanceData } from "@/pages/common/buildingManager/pageHooks/useAdminMaintenanceData.tsx";
import { useUpdateMaintenanceRequestStatusMutation } from "@/context/api/apiServices/maintenanceRequestApi.ts";

type StatusFilter = "All" | string;

export function AdminMaintenancePage() {
    const { loading, error, requests, requestsStatus, requestsTypes } = useAdminMaintenanceData();
    const [activeFilter, setActiveFilter] = useState<StatusFilter>("All");
    const [selectedRequest, setSelectedRequest] = useState<(typeof requests)[number] | null>(null);
    const [statusOverrides, setStatusOverrides] = useState<Record<string, string>>({});
    const [feedback, setFeedback] = useState<string | null>(null);
    const [updateMaintenanceRequestStatus] = useUpdateMaintenanceRequestStatusMutation();

    const orderedStatuses = useMemo(() => {
        return [...requestsStatus].sort((left, right) => Number(left.order ?? 0) - Number(right.order ?? 0));
    }, [requestsStatus]);

    const filteredRequests = useMemo(() => {
        if (activeFilter === "All") {
            return requests;
        }
        return requests.filter((request) => {
            const displayStatus = statusOverrides[String(request._id)] ?? requestsStatus.find((status) => status._id === request.status)?.text ?? request.status;
            return displayStatus === activeFilter;
        });
    }, [activeFilter, requests, requestsStatus, statusOverrides]);

    const getDisplayStatus = (request: (typeof requests)[number]) => {
        const overrideStatusId = statusOverrides[String(request._id)];
        const activeStatusId = overrideStatusId ?? request.status;
        const fallbackLabel = typeof request.status === "string" ? request.status : "Unknown";
        return requestsStatus.find((status) => status._id === activeStatusId)?.text ?? fallbackLabel;
    };

    const getStatusIndex = (statusId: string | undefined) => {
        return orderedStatuses.findIndex((status) => status._id === statusId);
    };

    const updateStatus = async (requestId: string, direction: "next" | "previous") => {
        const request = requests.find((item) => String(item._id) === requestId);
        if (!request) {
            return;
        }

        const currentStatusId = statusOverrides[requestId] ?? request.status;
        const currentIndex = getStatusIndex(String(currentStatusId));
        if (currentIndex === -1) {
            setFeedback("This request currently has no status mapping available.");
            return;
        }

        const targetIndex = direction === "next" ? currentIndex + 1 : currentIndex - 1;
        if (targetIndex < 0 || targetIndex >= orderedStatuses.length) {
            setFeedback(direction === "next" ? "This request is already at the final status." : "This request is already at the initial status.");
            return;
        }

        const targetStatus = orderedStatuses[targetIndex];
        try {
            await updateMaintenanceRequestStatus({ requestId, statusId: String(targetStatus._id) }).unwrap();
            setStatusOverrides((previous) => ({ ...previous, [requestId]: String(targetStatus._id) }));
            setFeedback(`Status updated to ${targetStatus.text}.`);
        } catch {
            setFeedback("Could not update the request status. Please try again.");
        }
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

                {feedback && <div className="info-banner">{feedback}</div>}
                {loading && <p>Loading maintenance requests...</p>}
                {error && <p className="form-error">{error}</p>}

                {!loading && !error && (
                    <section className="content-card">
                        <div className="section-title-row">
                            <h2>Active requests</h2>
                            <div className="filter-row">
                                {(["All", ...orderedStatuses.map((status) => status.text)] as StatusFilter[]).map((filter) => (
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
                                    const displayStatus = getDisplayStatus(request);
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
                            <p><strong>Status:</strong> {getDisplayStatus(selectedRequest)}</p>
                            <div className="filter-row">
                                <button
                                    type="button"
                                    className="secondary-button"
                                    onClick={() => updateStatus(String(selectedRequest._id), "previous")}
                                >
                                    Move back
                                </button>
                                <button
                                    type="button"
                                    className="primary-button"
                                    onClick={() => updateStatus(String(selectedRequest._id), "next")}
                                >
                                    Advance status
                                </button>
                            </div>
                            <div className="modal-actions">
                                <button type="button" className="secondary-button" onClick={() => setSelectedRequest(null)}>Close</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </CommonFrame>
    );
}
