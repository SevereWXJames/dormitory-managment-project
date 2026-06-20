import {useEffect, useState} from "react";
import { CommonFrame } from "../../../components/common/CommonFrame";
import {fetchJson} from "../../../utils/api.ts";
import type {Room} from "../../../dataTypes/room.ts";

export function AdminAccessCodesPage() {
    const [rooms, setRooms] = useState<Room[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadRequests = async () => {
            try {
                setRooms(await fetchJson<[Room]>("/rooms/"));
            } catch (fetchError) {
                setError(fetchError instanceof Error ? fetchError.message : "Unable to load maintenance requests.");
            } finally {
                setLoading(false);
            }
        };

        loadRequests();
    }, []);

    return (
        <>
            <CommonFrame commonFrameType="BUILDING_MANAGER" />
            <div className="adminAccessCodesPage">
                <h1>Access Codes Management</h1>
                <p>Manage building access codes and resident permissions here.</p>

                {loading && <p>Loading dashboard data...</p>}
                {error && <p style={{ color: "red" }}>{error}</p>}

                {!loading && !error && (

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
                            {rooms.map((item) => (
                                <tr key={item._id}>
                                    <td style={{ padding: "0.5rem", borderBottom: "1px solid #eee" }}>{item._id}</td>
                                    <td style={{ padding: "0.5rem", borderBottom: "1px solid #eee" }}>{item.verificationCode}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section> )}
            </div>
        </>
    );
}
