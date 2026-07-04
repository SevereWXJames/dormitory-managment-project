import { CommonFrame } from "../../../components/common/CommonFrame";
import { useGetNoticesQuery } from "@/context/api/apiServices/noticesApi.ts";

export function AdminNoticesPage() {
    const { data: notices = [], isLoading: loading, error } = useGetNoticesQuery();
    const errorMessage = error ? ("message" in error && typeof error.message === "string" ? error.message : "Failed to load notices.") : null;

    return (
        <>
            <CommonFrame commonFrameType="BUILDING_MANAGER">
                <div className="adminNoticesPage">
                    <h1>Building Notices</h1>
                    <p>Publish and review notices shared with residents.</p>

                    {loading && <p>Loading notices...</p>}
                    {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

                    {!loading && !errorMessage && (
                        <section>
                            <h2>Published notices</h2>
                            {notices.map((notice) => (
                                <div key={notice._id} style={{ border: "1px solid #ccc", borderRadius: 8, padding: "1rem", marginBottom: "1rem" }}>
                                    <div style={{ fontWeight: 600, marginBottom: "0.25rem" }}>{notice.title}</div>
                                    <div style={{ color: "#555", marginBottom: "0.25rem" }}>{new Date(notice.createAt).toLocaleString()}</div>
                                    <div>{notice.text}</div>
                                </div>
                            ))}
                        </section>
                    )}
                </div>
            </CommonFrame>
        </>
    );
}
