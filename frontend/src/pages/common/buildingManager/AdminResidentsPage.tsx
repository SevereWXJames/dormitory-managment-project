import { CommonFrame } from "../../../components/common/CommonFrame";
import {useAdminResidentsData} from "@/pages/common/buildingManager/pageHooks/useAdminResidentsData.tsx";

export function AdminResidentsPage() {
    // const [residents, setResidents] = useState<Resident[]>([]);
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState<string | null>(null);
    //
    // useEffect(() => {
    //     const loadResidents = async () => {
    //         try {
    //             const residentList = await fetchJson<Resident[]>("/residents/");
    //             setResidents(residentList);
    //         } catch (fetchError) {
    //             setError(fetchError instanceof Error ? fetchError.message : "Unable to load residents.");
    //         } finally {
    //             setLoading(false);
    //         }
    //     };
    //
    //     loadResidents();
    // }, []);

    const {loading, isError, error, residents} = useAdminResidentsData();

    return (
        <>
            <CommonFrame commonFrameType="BUILDING_MANAGER">
            <div className="adminResidentsPage">
                <h1>Residents Management</h1>
                <p>Admin tools for viewing and managing resident information.</p>

                {loading && <p>Loading residents...</p>}
                {isError && <p style={{ color: "red" }}>{error}</p>}

                {!loading && !isError && (
                    <section>
                        <h2>Residents</h2>
                        <table style={{ width: "100%", borderCollapse: "collapse" }}>
                            <thead>
                                <tr>
                                    <th style={{ textAlign: "left", borderBottom: "1px solid #ccc", padding: "0.5rem" }}>Resident ID</th>
                                    <th style={{ textAlign: "left", borderBottom: "1px solid #ccc", padding: "0.5rem" }}>User ID</th>
                                    <th style={{ textAlign: "left", borderBottom: "1px solid #ccc", padding: "0.5rem" }}>Room ID</th>
                                </tr>
                            </thead>
                            <tbody>
                                {residents.map((resident) => (
                                    <tr key={resident._id}>
                                        <td style={{ padding: "0.5rem", borderBottom: "1px solid #eee" }}>{resident._id}</td>
                                        <td style={{ padding: "0.5rem", borderBottom: "1px solid #eee" }}>{resident.userId}</td>
                                        <td style={{ padding: "0.5rem", borderBottom: "1px solid #eee" }}>{resident.roomId}</td>
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
