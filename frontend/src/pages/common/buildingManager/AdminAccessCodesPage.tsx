import {useMemo} from "react";
import { CommonFrame } from "../../../components/common/CommonFrame";

interface AccessCodeItem {
    RoomId: string;
    verificationCode: string;
}

function generateVerificationCode(): string {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    return Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
}

export function AdminAccessCodesPage() {
    const accessCodes = useMemo<AccessCodeItem[]>(() => [
        { RoomId: "room0", verificationCode: generateVerificationCode() },
        { RoomId: "room1", verificationCode: generateVerificationCode() },
        { RoomId: "room2", verificationCode: generateVerificationCode() },
    ], []);

    return (
        <>
            <CommonFrame commonFrameType="BUILDING_MANAGER" />
            <div className="adminAccessCodesPage">
                <h1>Access Codes Management</h1>
                <p>Manage building access codes and resident permissions here.</p>

                <section>
                    <h2>Access codes</h2>
                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                        <thead>
                            <tr>
                                <th style={{ textAlign: "left", borderBottom: "1px solid #ccc", padding: "0.5rem" }}>Room ID</th>
                                <th style={{ textAlign: "left", borderBottom: "1px solid #ccc", padding: "0.5rem" }}>Verification Code</th>
                            </tr>
                        </thead>
                        <tbody>
                            {accessCodes.map((item) => (
                                <tr key={item.RoomId}>
                                    <td style={{ padding: "0.5rem", borderBottom: "1px solid #eee" }}>{item.RoomId}</td>
                                    <td style={{ padding: "0.5rem", borderBottom: "1px solid #eee" }}>{item.verificationCode}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            </div>
        </>
    );
}
