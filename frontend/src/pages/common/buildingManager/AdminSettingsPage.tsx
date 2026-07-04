import { CommonFrame } from "../../../components/common/CommonFrame";

const profile = {
    name: "Alicia Chen",
    email: "alicia.chen@building.com",
    phone: "+1 604 555 0148",
};

const preferences = [
    { label: "Notifications", value: "Email + in-app" },
    { label: "Maintenance reminders", value: "Enabled" },
    { label: "Resident announcements", value: "Daily summary" },
];

export function AdminSettingsPage() {
    return (
        <>
            <CommonFrame commonFrameType="BUILDING_MANAGER">
                <div className="adminSettingsPage">
                    <h1>Admin Settings</h1>
                    <p>Review administrator profile details and current notification preferences.</p>

                    <section>
                        <h2>Profile</h2>
                        <div style={{ border: "1px solid #ccc", borderRadius: 8, padding: "1rem", marginBottom: "1rem" }}>
                            <div><strong>Name:</strong> {profile.name}</div>
                            <div><strong>Email:</strong> {profile.email}</div>
                            <div><strong>Phone:</strong> {profile.phone}</div>
                        </div>
                    </section>

                    <section>
                        <h2>Preferences</h2>
                        {preferences.map((item) => (
                            <div key={item.label} style={{ borderBottom: "1px solid #eee", padding: "0.5rem 0" }}>
                                <strong>{item.label}:</strong> {item.value}
                            </div>
                        ))}
                    </section>
                </div>
            </CommonFrame>
        </>
    );
}
