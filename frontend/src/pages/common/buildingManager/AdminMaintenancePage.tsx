import { CommonFrame } from "../../../components/common/CommonFrame";
import { useAdminMaintenanceData } from "@/pages/common/buildingManager/pageHooks/useAdminMaintenanceData.tsx";

export function AdminMaintenancePage() {
    const { loading, error, requests, requestsStatus, requestsTypes } = useAdminMaintenanceData();

    return (
        <>
            <CommonFrame commonFrameType="BUILDING_MANAGER">
                <div className="adminMaintenancePage">
                    <h1>Maintenance Requests</h1>
                    <p>Review current work orders and track their status.</p>

                    {loading && <p>Loading maintenance requests...</p>}
                    {error && <p style={{ color: "red" }}>{error}</p>}

                    {!loading && !error && (
                        <section>
                            <h2>Active requests</h2>
                            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                                <thead>
                                    <tr>
                                        <th style={{ textAlign: "left", borderBottom: "1px solid #ccc", padding: "0.5rem" }}>Request ID</th>
                                        <th style={{ textAlign: "left", borderBottom: "1px solid #ccc", padding: "0.5rem" }}>Room</th>
                                        <th style={{ textAlign: "left", borderBottom: "1px solid #ccc", padding: "0.5rem" }}>Type</th>
                                        <th style={{ textAlign: "left", borderBottom: "1px solid #ccc", padding: "0.5rem" }}>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {requests.map((request) => (
                                        <tr key={request._id}>
                                            <td style={{ padding: "0.5rem", borderBottom: "1px solid #eee" }}>{request._id}</td>
                                            <td style={{ padding: "0.5rem", borderBottom: "1px solid #eee" }}>{request.location ?? "N/A"}</td>
                                            <td style={{ padding: "0.5rem", borderBottom: "1px solid #eee" }}>{requestsTypes.find((type) => type._id === request.type)?.text ?? request.type}</td>
                                            <td style={{ padding: "0.5rem", borderBottom: "1px solid #eee" }}>{requestsStatus.find((status) => status._id === request.status)?.text ?? request.status}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </section>
                    )}
                </div>
            </CommonFrame>
        </>
    );
}
