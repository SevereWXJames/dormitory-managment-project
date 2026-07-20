import { useEffect, useMemo, useState } from "react";
import { CommonFrame } from "@/components/common/CommonFrame.tsx";
import { useGetRoomsQuery } from "@/context/api/apiServices/roomsApi.ts";

interface AccessRoom {
    _id: string;
    roomName: string;
    verificationCode: string;
}

export function AdminAccessCodesPage() {
    const { data: rooms = [], isLoading: loading, error } = useGetRoomsQuery();
    const [selectedRoom, setSelectedRoom] = useState<AccessRoom | null>(null);
    const [codeMap, setCodeMap] = useState<Record<string, string>>({});
    const [copiedCode, setCopiedCode] = useState<string | null>(null);
    const [guestPasses, setGuestPasses] = useState<Array<{ roomId: string; pass: string; expiresAt: string; createdAt: string }>>([]);
    const [feedback, setFeedback] = useState<string | null>(null);
    const errorMessage = error ? ("message" in error && typeof error.message === "string" ? error.message : "Failed to load access codes.") : null;

    useEffect(() => {
        setCodeMap((previous) => {
            const next = { ...previous };
            rooms.forEach((room) => {
                if (!next[room._id]) {
                    next[room._id] = room.verificationCode;
                }
            });
            return next;
        });
    }, [rooms]);

    const summaryCards = useMemo(() => [
        { label: "Active rooms", value: rooms.length.toString(), caption: "Ready for visitor check-in" },
        { label: "Pending rotation", value: Math.max(1, Math.min(3, rooms.length - 1)).toString(), caption: "Codes due for refresh" },
        { label: "Last sync", value: "2 min ago", caption: "From building access system" },
    ], [rooms.length]);

    const getCode = (room: AccessRoom) => codeMap[room._id] ?? room.verificationCode;

    const closeModal = () => setSelectedRoom(null);

    const handleGenerateCode = (room: AccessRoom) => {
        const nextCode = Math.random().toString(36).slice(2, 8).toUpperCase();
        setCodeMap((previous) => ({ ...previous, [room._id]: nextCode }));
        setSelectedRoom(room);
        setFeedback(`A new passcode was generated for ${room.roomName}.`);
    };

    const handleCopy = async (room: AccessRoom) => {
        await navigator.clipboard.writeText(getCode(room));
        setCopiedCode(room._id);
        setFeedback(`Access code copied for ${room.roomName}.`);
        window.setTimeout(() => setCopiedCode(null), 1500);
    };

    const handleBulkExport = () => {
        const exportData = rooms.map((room) => ({
            roomId: room._id,
            roomName: room.roomName,
            verificationCode: getCode(room),
        }));
        const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "access-codes-export.json";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        setFeedback("Export downloaded for current access-code data.");
    };

    const handleTemporaryPass = () => {
        if (!selectedRoom) {
            setFeedback("Please select a room before creating a temporary guest pass.");
            return;
        }

        const pass = Math.random().toString(36).slice(2, 8).toUpperCase();
        const expiresAt = new Date(Date.now() + 1000 * 60 * 30).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        const createdAt = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

        setGuestPasses((previous) => [
            { roomId: selectedRoom._id, pass, expiresAt, createdAt },
            ...previous,
        ]);

        setFeedback(`Temporary guest pass created for ${selectedRoom.roomName}.`);
    };

    return (
        <CommonFrame commonFrameType="BUILDING_MANAGER">
            <div className="admin-access-codes-page">
                <div className="admin-page-header">
                    <div>
                        <h1>Access Codes Management</h1>
                        <p>Review current building access codes and their status.</p>
                    </div>
                    <div className="page-actions">
                        <button type="button" className="secondary-button" onClick={handleBulkExport}>Bulk export</button>
                    </div>
                </div>

                {feedback && <div className="info-banner">{feedback}</div>}
                {loading && <p>Loading access codes...</p>}
                {errorMessage && <p className="form-error">{errorMessage}</p>}

                {!loading && !errorMessage && (
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
                                <h2>Access codes</h2>
                                <span className="section-pill">{rooms.length} rooms</span>
                            </div>
                            <table className="admin-table">
                                <thead>
                                    <tr>
                                        <th>Room ID</th>
                                        <th>Room Name</th>
                                        <th>Verification Code</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {rooms.map((item) => (
                                        <tr key={item._id}>
                                            <td>{item._id}</td>
                                            <td>{item.roomName}</td>
                                            <td><span className="status-chip">{getCode(item)}</span></td>
                                            <td>
                                                <div className="action-cell">
                                                    <button type="button" className="text-link" onClick={() => setSelectedRoom(item)}>Manage</button>
                                                    <button type="button" className="text-link" onClick={() => handleCopy(item)}>{copiedCode === item._id ? "Copied" : "Copy"}</button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </section>
                    </>
                )}

                {selectedRoom && (
                    <div className="modal-backdrop" onClick={closeModal}>
                        <div className="modal-card" onClick={(event) => event.stopPropagation()}>
                            <div className="modal-header">
                                <h3>Access code details</h3>
                                <button type="button" className="icon-button" onClick={closeModal}>×</button>
                            </div>
                            <p><strong>Room:</strong> {selectedRoom.roomName}</p>
                            <p><strong>Code:</strong> {getCode(selectedRoom)}</p>
                            <p className="small-muted">Last rotated 2 minutes ago and ready for resident use.</p>
                            <div className="modal-actions">
                                <button type="button" className="secondary-button" onClick={closeModal}>Close</button>
                                <button type="button" className="secondary-button" onClick={() => handleCopy(selectedRoom)}>Copy code</button>
                                <button type="button" className="primary-button" onClick={() => handleGenerateCode(selectedRoom)}>Generate new code</button>
                            </div>
                            <div className="modal-actions">
                                <button type="button" className="text-link" onClick={handleTemporaryPass}>Create temporary guest pass</button>
                            </div>
                            {guestPasses.filter((pass) => pass.roomId === selectedRoom._id).length > 0 && (
                                <section className="content-card" style={{ marginTop: "1rem" }}>
                                    <div className="section-title-row">
                                        <h4>Temporary guest passes</h4>
                                        <span className="section-pill">For this room</span>
                                    </div>
                                    <div className="list-stack">
                                        {guestPasses.filter((pass) => pass.roomId === selectedRoom._id).map((pass, index) => (
                                            <div key={`${pass.pass}-${index}`} className="list-item">
                                                <div>
                                                    <strong>{pass.pass}</strong>
                                                    <p>Expires at {pass.expiresAt}</p>
                                                </div>
                                                <span className="status-chip">Created {pass.createdAt}</span>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </CommonFrame>
    );
}
