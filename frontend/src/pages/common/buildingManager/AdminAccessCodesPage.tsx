import { useEffect, useState } from "react";
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

    const getCode = (room: AccessRoom) => codeMap[room._id] ?? room.verificationCode;

    const handleGenerateCode = (room: AccessRoom) => {
        const nextCode = Math.random().toString(36).slice(2, 8).toUpperCase();
        setCodeMap((previous) => ({ ...previous, [room._id]: nextCode }));
        setSelectedRoom(room);
    };

    const handleCopy = async (room: AccessRoom) => {
        await navigator.clipboard.writeText(getCode(room));
        setCopiedCode(room._id);
        setTimeout(() => setCopiedCode(null), 1500);
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
                        <button type="button" className="secondary-button">Bulk export</button>
                    </div>
                </div>

                {loading && <p>Loading access codes...</p>}
                {errorMessage && <p className="form-error">{errorMessage}</p>}

                {!loading && !errorMessage && (
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
                )}

                {selectedRoom && (
                    <div className="modal-backdrop" onClick={() => setSelectedRoom(null)}>
                        <div className="modal-card" onClick={(event) => event.stopPropagation()}>
                            <div className="modal-header">
                                <h3>Access code details</h3>
                                <button type="button" className="icon-button" onClick={() => setSelectedRoom(null)}>×</button>
                            </div>
                            <p><strong>Room:</strong> {selectedRoom.roomName}</p>
                            <p><strong>Code:</strong> {getCode(selectedRoom)}</p>
                            <div className="modal-actions">
                                <button type="button" className="secondary-button" onClick={() => setSelectedRoom(null)}>Close</button>
                                <button type="button" className="primary-button" onClick={() => handleGenerateCode(selectedRoom)}>Generate new code</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </CommonFrame>
    );
}
