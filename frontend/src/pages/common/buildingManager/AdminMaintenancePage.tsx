import { CommonFrame } from "../../../components/common/CommonFrame";

const maintenanceRequests = [
    { id: "MR-101", issue: "Leaky faucet", unit: "102", status: "Open", assignedTo: "Alex" },
    { id: "MR-102", issue: "Hallway light out", unit: "201", status: "In progress", assignedTo: "Jordan" },
    { id: "MR-103", issue: "AC not cooling", unit: "315", status: "Pending", assignedTo: "Not assigned" },
];

export function AdminMaintenancePage() {
    return (
        <>
            <CommonFrame commonFrameType="BUILDING_MANAGER" />
            <div className="adminMaintenancePage">
                <h1>Maintenance Requests</h1>
                <p>Admin view for reviewing and assigning maintenance tasks.</p>

                <section>
                    <h2>Active requests</h2>
                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                        <thead>
                            <tr>
                                <th style={{ textAlign: "left", borderBottom: "1px solid #ccc", padding: "0.5rem" }}>Request</th>
                                <th style={{ textAlign: "left", borderBottom: "1px solid #ccc", padding: "0.5rem" }}>Unit</th>
                                <th style={{ textAlign: "left", borderBottom: "1px solid #ccc", padding: "0.5rem" }}>Status</th>
                                <th style={{ textAlign: "left", borderBottom: "1px solid #ccc", padding: "0.5rem" }}>Assigned</th>
                            </tr>
                        </thead>
                        <tbody>
                            {maintenanceRequests.map((request) => (
                                <tr key={request.id}>
                                    <td style={{ padding: "0.5rem", borderBottom: "1px solid #eee" }}>{request.issue}</td>
                                    <td style={{ padding: "0.5rem", borderBottom: "1px solid #eee" }}>{request.unit}</td>
                                    <td style={{ padding: "0.5rem", borderBottom: "1px solid #eee" }}>{request.status}</td>
                                    <td style={{ padding: "0.5rem", borderBottom: "1px solid #eee" }}>{request.assignedTo}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            </div>
        </>
    );
}
