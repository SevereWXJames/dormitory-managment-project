import {useEffect, useState} from "react";
import { CommonFrame } from "../../../components/common/CommonFrame";
import { fetchJson } from "../../../utils/api";
import {type MaintenanceRequest, MaintenanceRequestType, MaintenanceRequestStatus} from "../../../dataTypes/maintenanceRequest.ts";

export function AdminMaintenancePage() {
    const [requests, setRequests] = useState<MaintenanceRequest[]>([]);
    const [requestsTypes, setRequestTypes] = useState<MaintenanceRequestType[]>([]);
    const [requestsStatus, setRequestStatus] = useState<MaintenanceRequestStatus[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadRequests = async () => {
            try {
                setRequests(await fetchJson<[MaintenanceRequest]>("/maintenance-request/"));
                setRequestTypes(await fetchJson<[MaintenanceRequestType]>("/maintenance-request/get-types/"));
                setRequestStatus(await fetchJson<[MaintenanceRequestStatus]>("/maintenance-request/get-statuses/"));
            } catch (fetchError) {
                setError(fetchError instanceof Error ? fetchError.message : "Unable to load maintenance requests.");
            } finally {
                setLoading(false);
            }
        };

        loadRequests();
    }, []);

    return (
        <>
            <CommonFrame commonFrameType="BUILDING_MANAGER" />
            <div className="adminMaintenancePage">
                <h1>Maintenance Requests</h1>
                <p>Admin view for reviewing and assigning maintenance tasks.</p>

                {loading && <p>Loading maintenance requests...</p>}
                {error && <p style={{ color: "red" }}>{error}</p>}

                {!loading && !error && (
                    <section>
                        <h2>Active requests</h2>
                        <table style={{ width: "100%", borderCollapse: "collapse" }}>
                            <thead>
                                <tr>
                                    <th style={{ textAlign: "left", borderBottom: "1px solid #ccc", padding: "0.5rem" }}>Request ID</th>
                                    <th style={{ textAlign: "left", borderBottom: "1px solid #ccc", padding: "0.5rem" }}>Type</th>
                                    <th style={{ textAlign: "left", borderBottom: "1px solid #ccc", padding: "0.5rem" }}>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {requests.map((request) => (
                                    <tr key={request._id}>
                                        <td style={{ padding: "0.5rem", borderBottom: "1px solid #eee" }}>{request._id}</td>
                                        <td style={{ padding: "0.5rem", borderBottom: "1px solid #eee" }}>{requestsTypes.find((type) => {
                                            return type._id === request.type;
                                        })?.text }</td>
                                        <td style={{ padding: "0.5rem", borderBottom: "1px solid #eee" }}>{requestsStatus.find((status) => {
                                            return status._id === request.status;
                                        })?.text}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </section>
                )}
            </div>
        </>
    );
}
