import { useGetServicesQuery } from "@/context/api/apiServices/servicesApi";
import { useGetSlotsByServiceIdQuery } from "@/context/api/apiServices/reservationSlotsApi";
import { CommonFrame } from "../../../components/common/CommonFrame";
import { useState } from "react";
import {ReservationsTable} from "@/components/admin/FacilityManagement/ReservationsTable.tsx";

function ServiceStatsItem({ serviceId, serviceName, isSelected, onSelect }: { serviceId: string; serviceName: string; isSelected: boolean; onSelect: () => void }) {
    const { data: allSlots = [] } = useGetSlotsByServiceIdQuery(serviceId);

    const totalSlots = allSlots.length;
    const reservedCount = allSlots.filter((slot) => slot.booked).length;

    return (
        <button
            onClick={onSelect}
            style={{
                padding: "0.75rem",
                border: isSelected ? "2px solid #2563eb" : "1px solid #d9d9d9",
                borderRadius: 6,
                background: isSelected ? "#eff6ff" : "#fff",
                cursor: "pointer",
                textAlign: "left",
                fontSize: "0.9rem",
                fontWeight: isSelected ? 600 : 400,
            }}
        >
            <div>{serviceName}</div>
            <div style={{ fontSize: "0.8rem", color: "#666", marginTop: "0.25rem" }}>
                {reservedCount}/{totalSlots} booked
            </div>
        </button>
    );
}

function SelectedServiceDetails({ serviceId, serviceName, description }: { serviceId: string; serviceName: string; description?: string }) {
    const { data: allSlots = [] } = useGetSlotsByServiceIdQuery(serviceId);

    const totalSlots = allSlots.length;
    const reservedCount = allSlots.filter((slot) => slot.booked).length;
    const availableCount = allSlots.filter((slot) => !slot.booked).length;
    const utilization = totalSlots > 0 ? Math.round((reservedCount / totalSlots) * 100) : 0;

    return (
        <div>
            <div style={{ marginBottom: "1rem" }}>
                <strong>{serviceName}</strong>
                <p style={{ margin: "0.5rem 0 0 0", fontSize: "0.9rem", color: "#666" }}>
                    {description || "No description"}
                </p>
            </div>

            <div style={{ display: "grid", gap: "0.75rem" }}>
                <div style={{ padding: "0.75rem", background: "#f0fdf4", borderRadius: 6 }}>
                    <div style={{ fontSize: "0.875rem", color: "#656e59" }}>Total Slots</div>
                    <div style={{ fontSize: "1.5rem", fontWeight: 700, marginTop: "0.25rem" }}>
                        {totalSlots}
                    </div>
                </div>
                <div style={{ padding: "0.75rem", background: "#fef3c7", borderRadius: 6 }}>
                    <div style={{ fontSize: "0.875rem", color: "#7a4e0f" }}>Available</div>
                    <div style={{ fontSize: "1.5rem", fontWeight: 700, marginTop: "0.25rem" }}>
                        {availableCount}
                    </div>
                </div>
                <div style={{ padding: "0.75rem", background: "#fee2e2", borderRadius: 6 }}>
                    <div style={{ fontSize: "0.875rem", color: "#7a1d1d" }}>Booked</div>
                    <div style={{ fontSize: "1.5rem", fontWeight: 700, marginTop: "0.25rem" }}>
                        {reservedCount}
                    </div>
                </div>
                <div style={{ padding: "0.75rem", background: "#f3f4f6", borderRadius: 6 }}>
                    <div style={{ fontSize: "0.875rem", color: "#374151" }}>Utilization</div>
                    <div style={{ fontSize: "1.5rem", fontWeight: 700, marginTop: "0.25rem" }}>
                        {utilization}%
                    </div>
                </div>
            </div>
        </div>
    );
}

export function AdminFacilitiesPage() {
    const { data: services = [], isLoading: servicesLoading } = useGetServicesQuery();
    const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);

    const selectedService = selectedServiceId ? services.find((s) => s._id === selectedServiceId) : null;

    return (
        <CommonFrame commonFrameType="BUILDING_MANAGER">
            <div className="adminFacilitiesPage" style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                <div>
                    <h1>Facilities Slot Management</h1>
                    <p>Monitor and manage resident reservation slots for all services.</p>
                </div>

                {/* {services.length > 0 && <SummaryStats services={services} />} */}

                <section style={{ display: "grid", gap: "1rem", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
                    <div style={{ border: "1px solid #d9d9d9", borderRadius: 8, padding: "1rem" }}>
                        <h2>Services</h2>
                        {servicesLoading && <p>Loading services...</p>}
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                            {services.map((service) => (
                                <ServiceStatsItem
                                    key={service._id}
                                    serviceId={service._id}
                                    serviceName={service.name}
                                    isSelected={selectedServiceId === service._id}
                                    onSelect={() => setSelectedServiceId(service._id)}
                                />
                            ))}
                        </div>
                    </div>

                    <div style={{ border: "1px solid #d9d9d9", borderRadius: 8, padding: "1rem" }}>
                        <h2>Slot Details</h2>
                        {selectedService ? (
                            <SelectedServiceDetails
                                serviceId={selectedService._id}
                                serviceName={selectedService.name}
                                description={selectedService.description}
                            />
                        ) : (
                            <p style={{ color: "#666" }}>Select a service to view slot details</p>
                        )}
                    </div>

                    <div>
                        <ReservationsTable/>
                    </div>
                </section>
            </div>
        </CommonFrame>
    );
}
