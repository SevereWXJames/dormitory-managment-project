import {CommonFrame} from "../../../../../components/common/CommonFrame.tsx";
import {useSelector} from "react-redux";
import {getEmail, getName, getPhoneNumber, getUsername} from "../../../../../context/authenticationSlice.ts";

export function SettingsPage() {
    const name = useSelector(getName);
    const username = useSelector(getUsername);
    const email = useSelector(getEmail);
    const phone = useSelector(getPhoneNumber);

    const profileItems = [
        { label: "Name", value: name || "Not available" },
        { label: "Username", value: username || "Not available" },
        { label: "Email", value: email || "Not available" },
        { label: "Phone number", value: phone || "Not available" },
    ];

    return (
        <CommonFrame commonFrameType="RESIDENT">
            <div className="settingsPage flex flex-col gap-6">
                <div className="contents w-full max-w-2xl text-left">
                    <div className="profile-settings">
                        <h1>Profile</h1>
                        <p className="text-sm text-muted-foreground">
                            These details are pulled from your signed-in account.
                        </p>
                        <div className="mt-4 rounded-lg border border-border p-4">
                            {profileItems.map((item) => (
                                <div key={item.label} className="flex justify-between gap-4 border-b border-border py-3 last:border-b-0">
                                    <span className="font-medium">{item.label}</span>
                                    <span className="text-right text-sm text-muted-foreground">{item.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="rounded-lg border border-border p-4">
                        <h2 className="text-lg font-semibold">Account status</h2>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Your resident account is active and ready for building services and maintenance requests.
                        </p>
                    </div>
                </div>
            </div>
        </CommonFrame>
    )
}