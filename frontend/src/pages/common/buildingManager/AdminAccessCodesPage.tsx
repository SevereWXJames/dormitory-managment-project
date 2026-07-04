import { CommonFrame } from "@/components/common/CommonFrame.tsx";

interface AccessCodeItem {
    roomId: string;
    verificationCode: string;
    status: string;
}

const accessCodes: AccessCodeItem[] = [
    { roomId: "room-201", verificationCode: "A-201-482", status: "Active" },
    { roomId: "room-202", verificationCode: "A-202-731", status: "Active" },
    { roomId: "room-305", verificationCode: "A-305-115", status: "Pending" },
];

export function AdminAccessCodesPage() {
    return (
        <>
            <CommonFrame commonFrameType="BUILDING_MANAGER">
                <div className="adminAccessCodesPage">
                    <h1>Access Codes Management</h1>
                    <p>Review current building access codes and their status.</p>

                    <section>
                        <h2>Access codes</h2>
                        <table style={{ width: "100%", borderCollapse: "collapse" }}>
                            <thead>
                                <tr>
                                    <th style={{ textAlign: "left", borderBottom: "1px solid #ccc", padding: "0.5rem" }}>Room ID</th>
                                    <th style={{ textAlign: "left", borderBottom: "1px solid #ccc", padding: "0.5rem" }}>Verification Code</th>
                                    <th style={{ textAlign: "left", borderBottom: "1px solid #ccc", padding: "0.5rem" }}>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {accessCodes.map((item) => (
                                    <tr key={item.roomId}>
                                        <td style={{ padding: "0.5rem", borderBottom: "1px solid #eee" }}>{item.roomId}</td>
                                        <td style={{ padding: "0.5rem", borderBottom: "1px solid #eee" }}>{item.verificationCode}</td>
                                        <td style={{ padding: "0.5rem", borderBottom: "1px solid #eee" }}>{item.status}</td>
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
