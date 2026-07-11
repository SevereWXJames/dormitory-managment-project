import { CommonFrame } from "../../../components/common/CommonFrame";

interface FacilityItem {
    facility_id: string;
    name: string;
    type: string;
    is_available: boolean;
    next_slot: string;
}

const facilities: FacilityItem[] = [
    { facility_id: "fac-001", name: "Gym", type: "Fitness", is_available: true, next_slot: "Today 6:00 PM" },
    { facility_id: "fac-002", name: "Study Lounge", type: "Study", is_available: true, next_slot: "Today 8:00 PM" },
    { facility_id: "fac-003", name: "Rooftop Patio", type: "Leisure", is_available: false, next_slot: "Closed for maintenance" },
];

export function AdminFacilitiesPage() {
    return (
        <>
            <CommonFrame commonFrameType="BUILDING_MANAGER">
                <div className="adminFacilitiesPage">
                    <h1>Facility Management</h1>
                    <p>Monitor facility availability and upcoming usage windows.</p>

                    <section>
                        <h2>Facilities overview</h2>
                        <div style={{ display: "grid", gap: "1rem", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
                            {facilities.map((facility) => (
                                <div key={facility.facility_id} style={{ border: "1px solid #ccc", borderRadius: 8, padding: "1rem" }}>
                                    <div style={{ fontWeight: 600 }}>{facility.name}</div>
                                    <div style={{ color: "#555", marginTop: "0.25rem" }}>{facility.type}</div>
                                    <div style={{ marginTop: "0.5rem" }}>Status: {facility.is_available ? "Available" : "Unavailable"}</div>
                                    <div style={{ marginTop: "0.25rem" }}>Next slot: {facility.next_slot}</div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </CommonFrame>
        </>
    );
}
