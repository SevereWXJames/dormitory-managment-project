import { useMemo, useState } from "react";
import { CommonFrame } from "../../../components/common/CommonFrame";
import { useAdminMaintenanceData } from "@/pages/common/buildingManager/pageHooks/useAdminMaintenanceData.tsx";
import { useUpdateMaintenanceRequestStatusMutation } from "@/context/api/apiServices/maintenanceRequestApi.ts";
import {
    mapBackendStatusIdToSimplifiedStatusId,
    mapBackendStatusToSimplifiedStatus,
    simplifiedStatusGroups,
    simplifiedStatusOrder,
} from "@/utils/maintenanceStatus.ts";
import {toast} from "sonner";

type StatusFilter = "All" | { id: string; text: string };

export function AdminMaintenancePage() {
    const { loading, error, requests, requestsStatus, requestsTypes } = useAdminMaintenanceData();
    const [activeFilter, setActiveFilter] = useState<StatusFilter>("All");
    const [selectedRequest, setSelectedRequest] = useState<(typeof requests)[number] | null>(null);
    const [statusOverrides, setStatusOverrides] = useState<Record<string, string>>({});
    const [updateMaintenanceRequestStatus] = useUpdateMaintenanceRequestStatusMutation();

    const filteredRequests = useMemo(() => {
        if (activeFilter === "All") {
            return requests;
        }
        const filterId = (activeFilter as any).id;
        return requests.filter((request) => {
            const overrideStatusId = statusOverrides[String(request._id)];
            const activeStatusId = overrideStatusId ?? request.status;
            return mapBackendStatusIdToSimplifiedStatusId(activeStatusId) === filterId;
        });
    }, [activeFilter, requests, statusOverrides]);

    const getDisplayStatus = (request: (typeof requests)[number]) => {
        const overrideStatusId = statusOverrides[String(request._id)];
        const activeStatusId = overrideStatusId ?? request.status;
        return mapBackendStatusToSimplifiedStatus(activeStatusId);
    };

    const getStatusIndex = (statusId: string | undefined) => {
        const simplifiedId = mapBackendStatusIdToSimplifiedStatusId(statusId);
        return simplifiedStatusOrder.findIndex((id) => id === simplifiedId);
    };

    const updateStatus = async (requestId: string, direction: "next" | "previous") => {
        const request = requests.find((item) => String(item._id) === requestId);
        if (!request) {
            return;
        }

        const currentStatusId = statusOverrides[requestId] ?? request.status;
        const currentIndex = getStatusIndex(String(currentStatusId));
        if (currentIndex === -1) {
            toast.error("This request currently has no status mapping available.");
            return;
        }

        const targetIndex = direction === "next" ? currentIndex + 1 : currentIndex - 1;
        if (targetIndex < 0 || targetIndex >= simplifiedStatusOrder.length) {
            if(direction === "next"){
                toast.error("This request is already at the final status.");
            } else {
                toast.error("This request is already at the initial status.");
            }
            return;
        }

        const targetStatusId = simplifiedStatusOrder[targetIndex];
        try {
            await updateMaintenanceRequestStatus({ requestId, statusId: String(targetStatusId) }).unwrap();
            setStatusOverrides((previous) => ({ ...previous, [requestId]: targetStatusId }));
            const targetDisplay = simplifiedStatusGroups[targetIndex]?.text ?? "Updated";
            toast.success(`Status updated to ${targetDisplay}.`);
        } catch {
            toast.error(`Error, failed to update request status. Please try again.`);
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
                </div>
                {loading && <p>Loading maintenance requests...</p>}
                {error && <p className="form-error">{error}</p>}

                {!loading && !error && (
                    <section className="content-card">
                        <div className="section-title-row">
                            <h2>Active requests</h2>
                            <div className="filter-row">
                                <button
                                    type="button"
                                    className={activeFilter === "All" ? "pill-button active" : "pill-button"}
                                    onClick={() => setActiveFilter("All")}
                                >
                                    All
                                </button>
                                {simplifiedStatusGroups.map((status) => (
                                    <button
                                        key={status.id}
                                        type="button"
                                        className={
                                            activeFilter !== "All" && (activeFilter as any).id === status.id
                                                ? "pill-button active"
                                                : "pill-button"
                                        }
                                        onClick={() => setActiveFilter({ id: status.id, text: status.text })}
                                    >
                                        {status.text}
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
