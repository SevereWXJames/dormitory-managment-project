import { CommonFrame } from "../../../components/common/CommonFrame";

const residents = [
    { name: "Ava Lee", unit: "102", status: "Active", moveIn: "2025-09-01" },
    { name: "Noah Patel", unit: "208", status: "Active", moveIn: "2026-01-15" },
    { name: "Mia Chen", unit: "315", status: "Pending renewal", moveIn: "2024-08-20" },
];

export function AdminResidentsPage() {
    return (
        <>
            <CommonFrame commonFrameType="BUILDING_MANAGER" />
            <div className="adminResidentsPage">
                <h1>Residents Management</h1>
                <p>Admin tools for viewing and managing resident information.</p>

                <section>
                    <h2>Current residents</h2>
                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                        <thead>
                            <tr>
                                <th style={{ textAlign: "left", borderBottom: "1px solid #ccc", padding: "0.5rem" }}>Name</th>
                                <th style={{ textAlign: "left", borderBottom: "1px solid #ccc", padding: "0.5rem" }}>Unit</th>
                                <th style={{ textAlign: "left", borderBottom: "1px solid #ccc", padding: "0.5rem" }}>Status</th>
                                <th style={{ textAlign: "left", borderBottom: "1px solid #ccc", padding: "0.5rem" }}>Move-in</th>
                            </tr>
                        </thead>
                        <tbody>
                            {residents.map((resident) => (
                                <tr key={resident.name}>
                                    <td style={{ padding: "0.5rem", borderBottom: "1px solid #eee" }}>{resident.name}</td>
                                    <td style={{ padding: "0.5rem", borderBottom: "1px solid #eee" }}>{resident.unit}</td>
                                    <td style={{ padding: "0.5rem", borderBottom: "1px solid #eee" }}>{resident.status}</td>
                                    <td style={{ padding: "0.5rem", borderBottom: "1px solid #eee" }}>{resident.moveIn}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            </div>
        </>
    );
}
