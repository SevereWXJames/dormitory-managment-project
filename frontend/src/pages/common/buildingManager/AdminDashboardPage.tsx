import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CommonFrame } from "../../../components/common/CommonFrame";
import { useAdminData } from "@/pages/common/buildingManager/pageHooks/useAdminData.tsx";

interface NoticeItem {
    notice_id: string | number;
    title: string;
    created_at: number | null;
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

const todaysPriorities = [
    { title: "Assign two urgent plumbing tickets", detail: "High priority follow-up needed", badge: "Urgent" },
    { title: "Confirm resident notice broadcast", detail: "Sent at 10:30 AM", badge: "Scheduled" },
    { title: "Review temporary guest access", detail: "Three passes expire today", badge: "Review" },
];

const upcomingInspections = [
    { title: "Elevator check", detail: "2:00 PM · Service room B", badge: "Today" },
    { title: "Fire alarm test", detail: "4:30 PM · Main lobby", badge: "Today" },
    { title: "Laundry room audit", detail: "Tomorrow · Basement", badge: "Tomorrow" },
];

export function AdminDashboardPage() {
    const { loading, error, managerData, maintenanceRequests, notices } = useAdminData();
    const navigate = useNavigate();
    const [activeModal, setActiveModal] = useState<"queue" | "publish" | "preview" | null>(null);
    const [selectedNotice, setSelectedNotice] = useState<NoticeItem | null>(null);
    const [noticeDraft, setNoticeDraft] = useState({ title: "", body: "" });
    const [localNotices, setLocalNotices] = useState<NoticeItem[]>([]);
    const [feedback, setFeedback] = useState<string | null>(null);

    const dashboardData: DashboardData = useMemo(() => {
        const publishedNotices = localNotices.length > 0 ? localNotices : (notices ?? []).slice(0, 3).map((notice) => ({
            notice_id: notice._id,
            title: notice.title,
            created_at: notice.createAt ?? null,
        }));

        if (!loading && !error && managerData && maintenanceRequests) {
            return {
                ...initialDashboardData,
                name: managerData.username,
                pending_maintenance_count: maintenanceRequests.length,
                recent_published_notices: publishedNotices.slice(0, 3),
            };
        }
        return initialDashboardData;
    }, [loading, error, managerData, maintenanceRequests, notices, localNotices]);

    const openNotice = (notice: NoticeItem) => {
        setSelectedNotice(notice);
        setActiveModal("preview");
    };

    const handleReviewResidents = () => {
        navigate("/admin/residents");
    };

    const handleOpenMaintenance = () => {
        setActiveModal(null);
        navigate("/admin/maintenance");
    };

    const handleShareNotice = () => {
        if (!noticeDraft.title.trim()) {
            setFeedback("Please enter a notice title before publishing.");
            return;
        }

        const newNotice: NoticeItem = {
            notice_id: `draft-${Date.now()}`,
            title: noticeDraft.title,
            created_at: Date.now(),
        };

        setLocalNotices((prev) => [newNotice, ...prev]);
        setNoticeDraft({ title: "", body: "" });
        setFeedback("Notice published in this session and added to the dashboard feed.");
        setActiveModal(null);
    };

    return (
        <CommonFrame commonFrameType="BUILDING_MANAGER">
            <div className="admin-dashboard-page">
                <div className="admin-page-header">
                    <div>
                        <h1>Building Manager Dashboard</h1>
                        <p>Overview of building activity, maintenance workload, and facility occupancy.</p>
                    </div>
                    <div className="page-actions">
                        <button type="button" className="secondary-button" onClick={() => setActiveModal("queue")}>Review queue</button>
                        <button type="button" className="secondary-button" onClick={handleReviewResidents}>Review residents</button>
                        <button type="button" className="primary-button" onClick={() => setActiveModal("publish")}>Publish notice</button>
                    </div>
                </div>

                {feedback && <div className="info-banner">{feedback}</div>}
                {loading && <p>Loading dashboard data...</p>}
                {error && <p className="form-error">{error}</p>}

                {!loading && !error && (
                    <>
                        <div className="dashboard-grid">
                            <section className="content-card metric-card">
                                <p className="card-label">Manager</p>
                                <h3>{dashboardData.name}</h3>
                                <p>On-site oversight and daily operations</p>
                            </section>

                            <section className="content-card metric-card">
                                <p className="card-label">Pending maintenance</p>
                                <h3>{dashboardData.pending_maintenance_count}</h3>
                                <p>Open work orders waiting for triage</p>
                            </section>

                            <section className="content-card metric-card">
                                <p className="card-label">Facility occupancy</p>
                                <h3>{Math.round(dashboardData.active_facilities_occupancy.reduce((sum, facility) => sum + facility.occupancy_rate, 0) / dashboardData.active_facilities_occupancy.length * 100)}%</h3>
                                <p>Average active facility usage</p>
                            </section>
                        </div>

                        <section className="content-card">
                            <div className="section-title-row">
                                <h2>Today's priorities</h2>
                                <span className="section-pill">Demo-ready</span>
                            </div>
                            <div className="list-stack">
                                {todaysPriorities.map((item) => (
                                    <div key={item.title} className="list-item">
                                        <div>
                                            <strong>{item.title}</strong>
                                            <p>{item.detail}</p>
                                        </div>
                                        <span className="status-chip">{item.badge}</span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className="content-card">
                            <div className="section-title-row">
                                <h2>Active facilities occupancy</h2>
                                <span className="section-pill">Live overview</span>
                            </div>
                            <div className="facility-grid">
                                {dashboardData.active_facilities_occupancy.map((facility) => (
                                    <div key={facility.facility_id} className="facility-card">
                                        <div className="facility-card-title">{facility.name}</div>
                                        <div className="facility-card-value">{(facility.occupancy_rate * 100).toFixed(0)}%</div>
                                        <div className="facility-card-caption">Current occupancy trend</div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className="content-card">
                            <div className="section-title-row">
                                <h2>Upcoming inspections</h2>
                                <span className="section-pill">Planned</span>
                            </div>
                            <div className="list-stack">
                                {upcomingInspections.map((item) => (
                                    <div key={item.title} className="list-item">
                                        <div>
                                            <strong>{item.title}</strong>
                                            <p>{item.detail}</p>
                                        </div>
                                        <span className="status-chip">{item.badge}</span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className="content-card">
                            <div className="section-title-row">
                                <h2>Recent published notices</h2>
                                <span className="section-pill">Latest updates</span>
                            </div>
                            {dashboardData.recent_published_notices.length > 0 ? (
                                <div className="notice-list">
                                    {dashboardData.recent_published_notices.map((notice) => (
                                        <button key={notice.notice_id} type="button" className="notice-item" onClick={() => openNotice(notice)}>
                                            <div>
                                                <strong>{notice.title}</strong>
                                                <p>{notice.created_at ? new Date(notice.created_at).toLocaleDateString() : "Recently published"}</p>
                                            </div>
                                            <span className="text-link">View</span>
                                        </button>
                                    ))}
                                </div>
                            ) : (
                                <p className="empty-state">No notices have been published yet.</p>
                            )}
                        </section>
                    </>
                )}

                {activeModal && (
                    <div className="modal-backdrop" onClick={() => setActiveModal(null)}>
                        <div className="modal-card" onClick={(event) => event.stopPropagation()}>
                            <div className="modal-header">
                                <h3>
                                    {activeModal === "queue" && "Maintenance queue"}
                                    {activeModal === "preview" && "Notice preview"}
                                    {activeModal === "publish" && "Publish new notice"}
                                </h3>
                                <button type="button" className="icon-button" onClick={() => setActiveModal(null)}>×</button>
                            </div>
                            {activeModal === "queue" && (
                                <>
                                    <p>There are {dashboardData.pending_maintenance_count} maintenance items waiting for review.</p>
                                    <div className="list-stack">
                                        {(maintenanceRequests ?? []).slice(0, 3).map((request) => (
                                            <div key={request._id} className="list-item">
                                                <div>
                                                    <strong>{request.title || "Maintenance item"}</strong>
                                                    <p>{request.location ? `Location: ${request.location}` : "Review this issue for next steps."}</p>
                                                </div>
                                                <span className="status-chip">Open</span>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}
                            {activeModal === "preview" && (
                                <>
                                    <p>{selectedNotice?.title ?? "This notice is ready for publication."}</p>
                                    <div className="content-card">
                                        <p className="small-muted">Published {selectedNotice?.created_at ? new Date(selectedNotice.created_at).toLocaleDateString() : "recently"}</p>
                                        <p>{selectedNotice?.title && "Notice content preview is available here for review before sharing."}</p>
                                    </div>
                                </>
                            )}
                            {activeModal === "publish" && (
                                <>
                                    <div className="form-row">
                                        <label>
                                            Notice title
                                            <input
                                                value={noticeDraft.title}
                                                onChange={(event) => setNoticeDraft((prev) => ({ ...prev, title: event.target.value }))}
                                                className="search-input"
                                                placeholder="Enter notice title"
                                            />
                                        </label>
                                    </div>
                                    <div className="form-row">
                                        <label>
                                            Notice body
                                            <textarea
                                                value={noticeDraft.body}
                                                onChange={(event) => setNoticeDraft((prev) => ({ ...prev, body: event.target.value }))}
                                                className="search-input"
                                                placeholder="Enter notice content"
                                                rows={5}
                                            />
                                        </label>
                                    </div>
                                    <p className="small-muted">This publishes a session-only notice draft for demo purposes only.</p>
                                </>
                            )}
                            <div className="modal-actions">
                                <button type="button" className="secondary-button" onClick={() => setActiveModal(null)}>Close</button>
                                {activeModal === "queue" && (
                                    <button type="button" className="primary-button" onClick={handleOpenMaintenance}>Open maintenance</button>
                                )}
                                {activeModal === "preview" && (
                                    <button type="button" className="primary-button" onClick={() => setActiveModal("publish")}>Create similar notice</button>
                                )}
                                {activeModal === "publish" && (
                                    <button type="button" className="primary-button" onClick={handleShareNotice}>Publish notice</button>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </CommonFrame>
    );
}
