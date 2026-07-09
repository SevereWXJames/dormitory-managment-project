import { useMemo, useState } from "react";
import { CommonFrame } from "../../../components/common/CommonFrame";
import { useAdminResidentsData } from "@/pages/common/buildingManager/pageHooks/useAdminResidentsData.tsx";

interface ResidentEntry {
    _id: string;
    userId: string;
    roomId: string;
}

export function AdminResidentsPage() {
    const { loading, isError, error, residents } = useAdminResidentsData();
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedResident, setSelectedResident] = useState<ResidentEntry | null>(null);

    const filteredResidents = useMemo(() => {
        const lower = searchTerm.trim().toLowerCase();
        if (!lower) {
            return residents;
        }
        return residents.filter((resident) => [resident._id, resident.userId, resident.roomId].some((value) => value.toLowerCase().includes(lower)));
    }, [residents, searchTerm]);

    return (
        <CommonFrame commonFrameType="BUILDING_MANAGER">
            <div className="admin-residents-page">
                <div className="admin-page-header">
                    <div>
                        <h1>Residents Management</h1>
                        <p>Manage current resident records and room assignments from this overview.</p>
                    </div>
                    <div className="page-actions">
                        <button type="button" className="secondary-button" onClick={() => setSelectedResident({ _id: "new", userId: "pending", roomId: "TBD" })}>New resident</button>
                    </div>
                </div>

                {loading && <p>Loading residents...</p>}
                {isError && <p className="form-error">{error}</p>}

                {!loading && !isError && (
                    <>
                        <section className="content-card">
                            <div className="section-title-row">
                                <h2>Resident directory</h2>
                                <span className="section-pill">{filteredResidents.length} active residents</span>
                            </div>
                            <div className="search-row">
                                <input
                                    value={searchTerm}
                                    onChange={(event) => setSearchTerm(event.target.value)}
                                    className="search-input"
                                    placeholder="Search by resident, user, or room ID"
                                />
                            </div>
                            <table className="admin-table">
                                <thead>
                                    <tr>
                                        <th>Resident ID</th>
                                        <th>User ID</th>
                                        <th>Room ID</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredResidents.map((resident) => (
                                        <tr key={resident._id}>
                                            <td>{resident._id}</td>
                                            <td>{resident.userId}</td>
                                            <td>{resident.roomId}</td>
                                            <td>
                                                <button type="button" className="text-link" onClick={() => setSelectedResident(resident)}>
                                                    View details
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </section>
                    </>
                )}

                {selectedResident && (
                    <div className="modal-backdrop" onClick={() => setSelectedResident(null)}>
                        <div className="modal-card" onClick={(event) => event.stopPropagation()}>
                            <div className="modal-header">
                                <h3>{selectedResident._id === "new" ? "Resident onboarding" : "Resident details"}</h3>
                                <button type="button" className="icon-button" onClick={() => setSelectedResident(null)}>×</button>
                            </div>
                            <p>
                                {selectedResident._id === "new"
                                    ? "This action opens the onboarding flow for a new resident assignment."
                                    : `Resident ${selectedResident._id} is assigned to room ${selectedResident.roomId}.`}
                            </p>
                            <div className="modal-actions">
                                <button type="button" className="secondary-button" onClick={() => setSelectedResident(null)}>Close</button>
                                <button type="button" className="primary-button" onClick={() => setSelectedResident(null)}>Save note</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </CommonFrame>
    );
}
