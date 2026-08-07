import {CommonFrame} from "../../../../../components/common/CommonFrame.tsx";
import {TextField} from "@mui/material";
import {useSelector} from "react-redux";
import {getEmail, getName, getPhoneNumber} from "../../../../../context/authenticationSlice.ts";

export type FieldProps = {
    input: string,
    label: string
}
export type ProfileFieldProps = {
    name: string;
    email: string;
    phone: string;
}

export function ProfileField({input, label}: FieldProps) {
    return (
        <TextField
            label={label}
            defaultValue={input}
            sx={{'& .MuiInputBase-input': {color: 'black'}}}
            slotProps={{
                input: {
                    disabled: true
                },
            }}/>
    )
}

export function ProfileFields({name, email, phone}: ProfileFieldProps) {
    return (
        <div className="flex flex-col p-4 m-4 gap-4 max-w-96">
            <ProfileField input={name} label="Name"/>
            <ProfileField input={email} label="Email"/>
            <ProfileField input={phone} label="Phone"/>
        </div>
    )
}

export function SettingsPage() {
    const name = useSelector(getName);
    const email = useSelector(getEmail);
    const phone = useSelector(getPhoneNumber);
    // console.log("email:", email);
    const user: ProfileFieldProps = {name, email, phone};
    return (
        <div>
            <CommonFrame commonFrameType={"RESIDENT"}>
                <div className="settingsPage flex flex-col">
                    <div className="contents w-fit">
                        <div className="profile-settings text-left">
                            <h1>Profile</h1>
                            <ProfileFields name={user.name}
                                           email={user.email} phone={user.phone}/>
                        </div>
                        <div className="security-settings flex flex-col text-left">
                            <h1>Security</h1>
                            <p>Please contact your building manager to make changes to your profile.</p>
                        </div>
                    </div>
                </div>
            </CommonFrame>
        </div>
    )
}