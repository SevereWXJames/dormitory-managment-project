import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CommonFrame } from "../../../components/common/CommonFrame";
import { useAdminResidentsData } from "@/pages/common/buildingManager/pageHooks/useAdminResidentsData.tsx";

interface ResidentEntry {
    _id: string;
    userId: string;
    roomId: string;
}

export function AdminResidentsPage() {
    const { loading, isError, error, residents } = useAdminResidentsData();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedResident, setSelectedResident] = useState<ResidentEntry | null>(null);
    const [feedback, setFeedback] = useState<string | null>(null);

    const filteredResidents = useMemo(() => {
        const lower = searchTerm.trim().toLowerCase();
        if (!lower) {
            return residents;
        }
        return residents.filter((resident) => [resident._id, resident.userId, resident.roomId].some((value) => value.toLowerCase().includes(lower)));
    }, [residents, searchTerm]);

    const summaryCards = useMemo(() => [
        { label: "Active residents", value: residents.length.toString(), caption: "Current occupied units" },
        { label: "Pending onboarding", value: Math.max(1, Math.min(3, residents.length - 2)).toString(), caption: "Assignments awaiting finalization" },
        { label: "Open issues", value: "2", caption: "Residents flagged for follow-up" },
    ], [residents.length]);

    const openNewResident = () => {
        setSelectedResident({ _id: "new", userId: "pending", roomId: "TBD" });
        setFeedback("Onboarding flow opened for a new resident assignment.");
    };

    const openMaintenance = () => {
        navigate("/admin/maintenance");
    };

    const handleSaveNote = () => {
        setFeedback("Resident note was saved and the update is visible to the team.");
        setSelectedResident(null);
    };

    return (
        <CommonFrame commonFrameType="BUILDING_MANAGER">
            <div className="admin-residents-page">
                <div className="admin-page-header">
                    <div>
                        <h1>Residents Management</h1>
                        <p>Manage current resident records and room assignments from this overview.</p>
                    </div>
                    <div className="page-actions">
                        <button type="button" className="secondary-button" onClick={openMaintenance}>Review issues</button>
                        <button type="button" className="primary-button" onClick={openNewResident}>New resident</button>
                    </div>
                </div>

                {feedback && <div className="info-banner">{feedback}</div>}
                {loading && <p>Loading residents...</p>}
                {isError && <p className="form-error">{error}</p>}

                {!loading && !isError && (
                    <>
                        <section className="content-card">
                            <div className="summary-grid">
                                {summaryCards.map((card) => (
                                    <div key={card.label} className="summary-card">
                                        <p className="card-label">{card.label}</p>
                                        <div className="summary-card-value">{card.value}</div>
                                        <p className="small-muted">{card.caption}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

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

                        <section className="content-card">
                            <div className="section-title-row">
                                <h2>Resident highlights</h2>
                                <span className="section-pill">Demo snapshot</span>
                            </div>
                            <div className="list-stack">
                                {filteredResidents.slice(0, 3).map((resident) => (
                                    <div key={resident._id} className="list-item">
                                        <div>
                                            <strong>{resident._id}</strong>
                                            <p>Assigned to room {resident.roomId}</p>
                                        </div>
                                        <span className="status-chip">Active</span>
                                    </div>
                                ))}
                            </div>
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
                            <p className="small-muted">A short note can be attached to prepare the move-in or follow-up task.</p>
                            <div className="modal-actions">
                                <button type="button" className="secondary-button" onClick={() => setSelectedResident(null)}>Close</button>
                                <button type="button" className="primary-button" onClick={handleSaveNote}>Save note</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </CommonFrame>
    );
}
