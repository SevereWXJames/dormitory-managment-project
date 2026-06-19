import { CommonFrame } from "../../../components/common/CommonFrame";

const dashboardData = {
    name: "Alex Morgan",
    pending_maintenance_count: 6,
    active_facilities_occupancy: [
        { facility_id: 1, name: "Gym", occupancy_rate: 0.82 },
        { facility_id: 2, name: "Study Lounge", occupancy_rate: 0.63 },
        { facility_id: 3, name: "Rooftop Patio", occupancy_rate: 0.47 },
    ],
    recent_published_notices: [
        { notice_id: 101, title: "Water shutdown Thursday", created_at: 1710203400000 },
        { notice_id: 102, title: "New access code issued for service staff", created_at: 1710289800000 },
        { notice_id: 103, title: "Gym hours extended on weekends", created_at: 1710376200000 },
    ],
};

export function AdminDashboardPage() {
    return (
        <>
            <CommonFrame commonFrameType="BUILDING_MANAGER" />
            <div className="adminDashboardPage">
                <h1>Building Manager Dashboard</h1>
                <p>Overview of building activity, maintenance workload, and facility occupancy.</p>

                <section>
                    <h2>Manager</h2>
                    <div style={{ padding: "1rem", border: "1px solid #ccc", borderRadius: 8, marginBottom: "1rem" }}>
                        <strong>Name: </strong>{dashboardData.name}
                    </div>
                </section>

                <section>
                    <h2>Pending maintenance</h2>
                    <div style={{ display: "inline-flex", alignItems: "center", padding: "1rem", border: "1px solid #ccc", borderRadius: 8, marginBottom: "1rem" }}>
                        <span style={{ fontSize: "2rem", fontWeight: 600, marginRight: "0.75rem" }}>{dashboardData.pending_maintenance_count}</span>
                        <span>open maintenance requests</span>
                    </div>
                </section>

                <section>
                    <h2>Active facilities occupancy</h2>
                    <div style={{ display: "grid", gap: "0.75rem", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}>
                        {dashboardData.active_facilities_occupancy.map((facility) => (
                            <div key={facility.facility_id} style={{ border: "1px solid #ccc", borderRadius: 8, padding: "1rem" }}>
                                <div style={{ fontWeight: 600 }}>{facility.name}</div>
                                <div>Occupancy rate: {(facility.occupancy_rate * 100).toFixed(0)}%</div>
                            </div>
                        ))}
                    </div>
                </section>

                <section>
                    <h2>Recent published notices</h2>
                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                        <thead>
                            <tr>
                                <th style={{ textAlign: "left", borderBottom: "1px solid #ccc", padding: "0.5rem" }}>Notice</th>
                                <th style={{ textAlign: "left", borderBottom: "1px solid #ccc", padding: "0.5rem" }}>Published</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dashboardData.recent_published_notices.map((notice) => (
                                <tr key={notice.notice_id}>
                                    <td style={{ padding: "0.5rem", borderBottom: "1px solid #eee" }}>{notice.title}</td>
                                    <td style={{ padding: "0.5rem", borderBottom: "1px solid #eee" }}>{new Date(notice.created_at).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            </div>
        </>
    );
}
