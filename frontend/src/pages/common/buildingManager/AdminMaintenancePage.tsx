import { CommonFrame } from "../../../components/common/CommonFrame";

interface MaintenanceRequestItem {
    _id: string;
    roomId: string;
    type: string;
    status: string;
    createdAt: string;
    priority: string;
    description: string;
}

const requests: MaintenanceRequestItem[] = [
    { _id: "req-1001", roomId: "room-201", type: "Plumbing", status: "New", createdAt: "2026-07-01", priority: "High", description: "Water leak under kitchen sink." },
    { _id: "req-1002", roomId: "room-305", type: "Electrical", status: "InProgress", createdAt: "2026-06-29", priority: "Medium", description: "Light fixture in hallway flickers." },
    { _id: "req-1003", roomId: "room-202", type: "HVAC", status: "Resolved", createdAt: "2026-06-25", priority: "Low", description: "Air conditioning was serviced." },
];

export function AdminMaintenancePage() {
    return (
        <>
            <CommonFrame commonFrameType="BUILDING_MANAGER">
                <div className="adminMaintenancePage">
                    <h1>Maintenance Requests</h1>
                    <p>Review current work orders and track their status.</p>

                    <section>
                        <h2>Active requests</h2>
                        <table style={{ width: "100%", borderCollapse: "collapse" }}>
                            <thead>
                                <tr>
                                    <th style={{ textAlign: "left", borderBottom: "1px solid #ccc", padding: "0.5rem" }}>Request ID</th>
                                    <th style={{ textAlign: "left", borderBottom: "1px solid #ccc", padding: "0.5rem" }}>Room</th>
                                    <th style={{ textAlign: "left", borderBottom: "1px solid #ccc", padding: "0.5rem" }}>Type</th>
                                    <th style={{ textAlign: "left", borderBottom: "1px solid #ccc", padding: "0.5rem" }}>Status</th>
                                    <th style={{ textAlign: "left", borderBottom: "1px solid #ccc", padding: "0.5rem" }}>Priority</th>
                                </tr>
                            </thead>
                            <tbody>
                                {requests.map((request) => (
                                    <tr key={request._id}>
                                        <td style={{ padding: "0.5rem", borderBottom: "1px solid #eee" }}>{request._id}</td>
                                        <td style={{ padding: "0.5rem", borderBottom: "1px solid #eee" }}>{request.roomId}</td>
                                        <td style={{ padding: "0.5rem", borderBottom: "1px solid #eee" }}>{request.type}</td>
                                        <td style={{ padding: "0.5rem", borderBottom: "1px solid #eee" }}>{request.status}</td>
                                        <td style={{ padding: "0.5rem", borderBottom: "1px solid #eee" }}>{request.priority}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </section>
                </div>
            </CommonFrame>
        </>
    );
}
