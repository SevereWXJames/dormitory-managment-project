import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CommonFrame } from "../../../components/common/CommonFrame";
import { useAdminResidentsData } from "@/pages/common/buildingManager/pageHooks/useAdminResidentsData.tsx";

interface ResidentEntry {
    _id: string;
    userId: string;
    roomId: string;
    note?: string;
}

export function AdminResidentsPage() {
    const { loading, isError, error, residents } = useAdminResidentsData();
    const navigate = useNavigate();
    const [localResidents, setLocalResidents] = useState<ResidentEntry[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedResident, setSelectedResident] = useState<ResidentEntry | null>(null);
    const [residentForm, setResidentForm] = useState({ userId: "", roomId: "", note: "" });
    const [feedback, setFeedback] = useState<string | null>(null);

    useEffect(() => {
        if (!loading && !isError && localResidents.length === 0) {
            setLocalResidents(residents.map((resident) => ({
                _id: resident._id,
                userId: resident.userId,
                roomId: resident.roomId,
            })));
        }
    }, [loading, isError, residents, localResidents.length]);

    const filteredResidents = useMemo(() => {
        const lower = searchTerm.trim().toLowerCase();
        if (!lower) {
            return localResidents;
        }
        return localResidents.filter((resident) => [resident._id, resident.userId, resident.roomId].some((value) => value.toLowerCase().includes(lower)));
    }, [localResidents, searchTerm]);

    const summaryCards = useMemo(() => [
        { label: "Active residents", value: residents.length.toString(), caption: "Current occupied units" },
        { label: "Pending onboarding", value: Math.max(1, Math.min(3, residents.length - 2)).toString(), caption: "Assignments awaiting finalization" },
        { label: "Open issues", value: "2", caption: "Residents flagged for follow-up" },
    ], [residents.length]);

    const openNewResident = () => {
        const newId = `new-${Date.now()}`;
        setSelectedResident({ _id: newId, userId: "", roomId: "", note: "" });
        setResidentForm({ userId: "", roomId: "", note: "" });
        setFeedback("Onboarding flow opened for a new resident assignment.");
    };

    const openMaintenance = () => {
        navigate("/admin/maintenance");
    };

    const openResidentDetails = (resident: ResidentEntry) => {
        setSelectedResident(resident);
        setResidentForm({ userId: resident.userId, roomId: resident.roomId, note: resident.note ?? "" });
    };

    const handleSaveResident = () => {
        if (!selectedResident) {
            return;
        }

        if (selectedResident._id.startsWith("new-")) {
            setLocalResidents((previous) => [
                {
                    _id: selectedResident._id,
                    userId: residentForm.userId || "pending",
                    roomId: residentForm.roomId || "TBD",
                    note: residentForm.note,
                },
                ...previous,
            ]);
            setFeedback("New resident added in the current session.");
        } else {
            setLocalResidents((previous) => previous.map((resident) => (
                resident._id === selectedResident._id ? { ...resident, userId: residentForm.userId, roomId: residentForm.roomId, note: residentForm.note } : resident
            )));
            setFeedback("Resident details updated in the current session.");
        }

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
                                                <button type="button" className="text-link" onClick={() => openResidentDetails(resident)}>
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
                                <h3>{selectedResident._id.startsWith("new-") ? "Resident onboarding" : "Resident details"}</h3>
                                <button type="button" className="icon-button" onClick={() => setSelectedResident(null)}>×</button>
                            </div>
                            <div className="form-row">
                                <label>
                                    User ID
                                    <input
                                        value={residentForm.userId}
                                        onChange={(event) => setResidentForm((prev) => ({ ...prev, userId: event.target.value }))}
                                        className="search-input"
                                        placeholder="Enter user ID"
                                    />
                                </label>
                            </div>
                            <div className="form-row">
                                <label>
                                    Room ID
                                    <input
                                        value={residentForm.roomId}
                                        onChange={(event) => setResidentForm((prev) => ({ ...prev, roomId: event.target.value }))}
                                        className="search-input"
                                        placeholder="Enter room ID"
                                    />
                                </label>
                            </div>
                            <div className="form-row">
                                <label>
                                    Notes
                                    <textarea
                                        value={residentForm.note}
                                        onChange={(event) => setResidentForm((prev) => ({ ...prev, note: event.target.value }))}
                                        className="search-input"
                                        placeholder="Add a note for this resident"
                                        rows={4}
                                    />
                                </label>
                            </div>
                            <p className="small-muted">This page edits the current session state only. Refreshing will revert the changes.</p>
                            <div className="modal-actions">
                                <button type="button" className="secondary-button" onClick={() => setSelectedResident(null)}>Close</button>
                                <button type="button" className="primary-button" onClick={handleSaveResident}>Save resident</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </CommonFrame>
    );
}
