import { CommonFrame } from "../../../components/common/CommonFrame";

const accessCodes = [
    { code: "A12B3", description: "Main entrance - daytime", status: "Active" },
    { code: "C45D6", description: "Gym access", status: "Active" },
    { code: "E78F9", description: "Pool area - temporary", status: "Expired" },
];

export function AdminAccessCodesPage() {
    return (
        <>
            <CommonFrame commonFrameType="BUILDING_MANAGER" />
            <div className="adminAccessCodesPage">
                <h1>Access Codes Management</h1>
                <p>Manage building access codes and resident permissions here.</p>

                <section>
                    <h2>Current access codes</h2>
                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                        <thead>
                            <tr>
                                <th style={{ textAlign: "left", borderBottom: "1px solid #ccc", padding: "0.5rem" }}>Code</th>
                                <th style={{ textAlign: "left", borderBottom: "1px solid #ccc", padding: "0.5rem" }}>Description</th>
                                <th style={{ textAlign: "left", borderBottom: "1px solid #ccc", padding: "0.5rem" }}>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {accessCodes.map((item) => (
                                <tr key={item.code}>
                                    <td style={{ padding: "0.5rem", borderBottom: "1px solid #eee" }}>{item.code}</td>
                                    <td style={{ padding: "0.5rem", borderBottom: "1px solid #eee" }}>{item.description}</td>
                                    <td style={{ padding: "0.5rem", borderBottom: "1px solid #eee" }}>{item.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            </div>
        </>
    );
}
