import {useEffect, useState} from "react";
import { CommonFrame } from "../../../components/common/CommonFrame";
import { fetchJson } from "../../../utils/api";

interface NoticeItem {
    notice_id: string | number;
    title: string;
    created_at: number;
}

interface DashboardData {
    name: string;
    pending_maintenance_count: number;
    active_facilities_occupancy: { facility_id: number; name: string; occupancy_rate: number }[];
    recent_published_notices: NoticeItem[];
}

const initialDashboardData: DashboardData = {
    name: "Building Manager",
    pending_maintenance_count: 0,
    active_facilities_occupancy: [
        { facility_id: 1, name: "Gym", occupancy_rate: 0.82 },
        { facility_id: 2, name: "Study Lounge", occupancy_rate: 0.63 },
        { facility_id: 3, name: "Rooftop Patio", occupancy_rate: 0.47 },
    ],
    recent_published_notices: [],
};

export function AdminDashboardPage() {
    const [dashboardData, setDashboardData] = useState<DashboardData>(initialDashboardData);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                const manager = await fetchJson<{ _id: string; username: string }>("/user/get-by-id/admin0");
                const maintenanceRequests = await fetchJson<Array<{ _id: string }>>("/maintenance-request/");
                const notices = await fetchJson<Array<{ _id: string; title: string; createdAt?: string; created_at?: number }>>("/notices/");

                setDashboardData({
                    ...initialDashboardData,
                    name: manager.username,
                    pending_maintenance_count: maintenanceRequests.length,
                    recent_published_notices: notices.slice(0, 3).map((notice) => ({
                        notice_id: notice._id,
                        title: notice.title,
                        created_at: notice.created_at ?? Date.now(),
                    })),
                });
            } catch (fetchError) {
                setError(fetchError instanceof Error ? fetchError.message : "Unable to load dashboard data.");
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    return (
        <>
            <CommonFrame commonFrameType="BUILDING_MANAGER" />
            <div className="adminDashboardPage">
                <h1>Building Manager Dashboard</h1>
                <p>Overview of building activity, maintenance workload, and facility occupancy.</p>

                {loading && <p>Loading dashboard data...</p>}
                {error && <p style={{ color: "red" }}>{error}</p>}

                {!loading && !error && (
                    <>
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
                    </>
                )}
            </div>
        </>
    );
}
