import { CommonFrame } from "../../../components/common/CommonFrame";

const dashboardSummary = [
    { label: "Active residents", value: 128 },
    { label: "Open maintenance", value: 6 },
    { label: "Upcoming inspections", value: 2 },
];

const recentAlerts = [
    "Front door access code updated",
    "Elevator inspection scheduled for Friday",
    "3 new resident requests pending approval",
];

export function AdminDashboardPage() {
    return (
        <>
            <CommonFrame commonFrameType="BUILDING_MANAGER" />
            <div className="adminDashboardPage">
                <h1>Building Manager Dashboard</h1>
                <p>View recent building status, resident activity, and maintenance summaries.</p>

                <section>
                    <h2>Quick summary</h2>
                    <div className="dashboard-summary-cards" style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                        {dashboardSummary.map((item) => (
                            <div key={item.label} className="summary-card" style={{ border: "1px solid #ccc", borderRadius: 8, padding: "1rem", minWidth: 180 }}>
                                <div style={{ fontSize: "0.9rem", color: "#555" }}>{item.label}</div>
                                <div style={{ fontSize: "2rem", fontWeight: 600 }}>{item.value}</div>
                            </div>
                        ))}
                    </div>
                </section>

                <section>
                    <h2>Recent alerts</h2>
                    <ul>
                        {recentAlerts.map((alert) => (
                            <li key={alert}>{alert}</li>
                        ))}
                    </ul>
                </section>
            </div>
        </>
    );
}
