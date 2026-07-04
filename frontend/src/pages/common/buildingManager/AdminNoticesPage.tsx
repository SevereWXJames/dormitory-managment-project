import { CommonFrame } from "../../../components/common/CommonFrame";

interface NoticeItem {
    notice_id: string;
    title: string;
    body: string;
    created_at: string;
    visibility_scope: string;
}

const notices: NoticeItem[] = [
    { notice_id: "n-001", title: "Pool maintenance scheduled", body: "The pool will be closed for cleaning on Friday from 9am to 1pm.", created_at: "2026-07-02", visibility_scope: "All residents" },
    { notice_id: "n-002", title: "Package room update", body: "New parcel lockers are now available near the main lobby.", created_at: "2026-06-30", visibility_scope: "Residents only" },
];

export function AdminNoticesPage() {
    return (
        <>
            <CommonFrame commonFrameType="BUILDING_MANAGER">
                <div className="adminNoticesPage">
                    <h1>Building Notices</h1>
                    <p>Publish and review notices shared with residents.</p>

                    <section>
                        <h2>Published notices</h2>
                        {notices.map((notice) => (
                            <div key={notice.notice_id} style={{ border: "1px solid #ccc", borderRadius: 8, padding: "1rem", marginBottom: "1rem" }}>
                                <div style={{ fontWeight: 600, marginBottom: "0.25rem" }}>{notice.title}</div>
                                <div style={{ color: "#555", marginBottom: "0.25rem" }}>{notice.created_at}</div>
                                <div>{notice.body}</div>
                                <div style={{ marginTop: "0.5rem", fontSize: "0.9rem", color: "#2563eb" }}>{notice.visibility_scope}</div>
                            </div>
                        ))}
                    </section>
                </div>
            </CommonFrame>
        </>
    );
}
