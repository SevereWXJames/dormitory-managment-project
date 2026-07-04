import { CommonFrame } from "@/components/common/CommonFrame.tsx";
import { useGetRoomsQuery } from "@/context/api/apiServices/roomsApi.ts";

export function AdminAccessCodesPage() {
    const { data: rooms = [], isLoading: loading, error } = useGetRoomsQuery();
    const errorMessage = error ? ("message" in error && typeof error.message === "string" ? error.message : "Failed to load access codes.") : null;

    return (
        <>
            <CommonFrame commonFrameType="BUILDING_MANAGER">
                <div className="adminAccessCodesPage">
                    <h1>Access Codes Management</h1>
                    <p>Review current building access codes and their status.</p>

                    {loading && <p>Loading access codes...</p>}
                    {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

                    {!loading && !errorMessage && (
                        <section>
                            <h2>Access codes</h2>
                            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                                <thead>
                                    <tr>
                                        <th style={{ textAlign: "left", borderBottom: "1px solid #ccc", padding: "0.5rem" }}>Room ID</th>
                                        <th style={{ textAlign: "left", borderBottom: "1px solid #ccc", padding: "0.5rem" }}>Room Name</th>
                                        <th style={{ textAlign: "left", borderBottom: "1px solid #ccc", padding: "0.5rem" }}>Verification Code</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {rooms.map((item) => (
                                        <tr key={item._id}>
                                            <td style={{ padding: "0.5rem", borderBottom: "1px solid #eee" }}>{item._id}</td>
                                            <td style={{ padding: "0.5rem", borderBottom: "1px solid #eee" }}>{item.roomName}</td>
                                            <td style={{ padding: "0.5rem", borderBottom: "1px solid #eee" }}>{item.verificationCode}</td>
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
