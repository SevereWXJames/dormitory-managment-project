import {useEffect, useState} from "react";
import { CommonFrame } from "../../../components/common/CommonFrame";
import { fetchJson } from "../../../utils/api";

interface MaintenanceRequestItem {
    request_id: string;
    roomId: string;
    type: string;
    status: string;
    created_at: number;
    priority?: string;
    location?: string | null;
    description?: string;
}

export function AdminMaintenancePage() {
    const [requests, setRequests] = useState<MaintenanceRequestItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadRequests = async () => {
            try {
                const backendRequests = await fetchJson<Array<{ _id: string; type: string; status: string; description?: string; priority?: string; location?: string | null }>>("/maintenance-request/");
                const mapped = backendRequests.map((request) => ({
                    request_id: request._id,
                    roomId: "",
                    type: request.type,
                    status: request.status === "completed" ? "Resolved" : request.status === "inProgress" ? "InProgress" : "New",
                    created_at: Date.now() - Math.floor(Math.random() * 1000000000),
                    priority: request.priority,
                    location: request.location,
                    description: request.description,
                }));
                setRequests(mapped);
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
                                    <th style={{ textAlign: "left", borderBottom: "1px solid #ccc", padding: "0.5rem" }}>Created</th>
                                </tr>
                            </thead>
                            <tbody>
                                {requests.map((request) => (
                                    <tr key={request.request_id}>
                                        <td style={{ padding: "0.5rem", borderBottom: "1px solid #eee" }}>{request.request_id}</td>
                                        <td style={{ padding: "0.5rem", borderBottom: "1px solid #eee" }}>{request.type}</td>
                                        <td style={{ padding: "0.5rem", borderBottom: "1px solid #eee" }}>{request.status}</td>
                                        <td style={{ padding: "0.5rem", borderBottom: "1px solid #eee" }}>{new Date(request.created_at).toLocaleDateString()}</td>
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
