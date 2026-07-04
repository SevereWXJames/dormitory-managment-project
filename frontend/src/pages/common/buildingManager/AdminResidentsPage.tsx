import { CommonFrame } from "../../../components/common/CommonFrame";

interface ResidentItem {
    _id: string;
    userId: string;
    roomId: string;
    name: string;
    status: string;
}

const residents: ResidentItem[] = [
    { _id: "res-001", userId: "user-101", roomId: "room-201", name: "Ava Chen", status: "Active" },
    { _id: "res-002", userId: "user-102", roomId: "room-202", name: "Daniel Kim", status: "Active" },
    { _id: "res-003", userId: "user-103", roomId: "room-305", name: "Maya Patel", status: "Pending" },
];

export function AdminResidentsPage() {
    return (
        <>
            <CommonFrame commonFrameType="BUILDING_MANAGER">
                <div className="adminResidentsPage">
                    <h1>Residents Management</h1>
                    <p>Manage current resident records and room assignments from this overview.</p>

                    <section>
                        <h2>Resident directory</h2>
                        <table style={{ width: "100%", borderCollapse: "collapse" }}>
                            <thead>
                                <tr>
                                    <th style={{ textAlign: "left", borderBottom: "1px solid #ccc", padding: "0.5rem" }}>Resident</th>
                                    <th style={{ textAlign: "left", borderBottom: "1px solid #ccc", padding: "0.5rem" }}>User ID</th>
                                    <th style={{ textAlign: "left", borderBottom: "1px solid #ccc", padding: "0.5rem" }}>Room ID</th>
                                    <th style={{ textAlign: "left", borderBottom: "1px solid #ccc", padding: "0.5rem" }}>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {residents.map((resident) => (
                                    <tr key={resident._id}>
                                        <td style={{ padding: "0.5rem", borderBottom: "1px solid #eee" }}>{resident.name}</td>
                                        <td style={{ padding: "0.5rem", borderBottom: "1px solid #eee" }}>{resident.userId}</td>
                                        <td style={{ padding: "0.5rem", borderBottom: "1px solid #eee" }}>{resident.roomId}</td>
                                        <td style={{ padding: "0.5rem", borderBottom: "1px solid #eee" }}>{resident.status}</td>
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
