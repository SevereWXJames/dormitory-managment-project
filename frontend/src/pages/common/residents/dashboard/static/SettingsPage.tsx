import {CommonFrame} from "../../../../../components/common/CommonFrame.tsx";
import {Button, TextField} from "@mui/material";
import {useSelector} from "react-redux";
import {getEmail, getName, getPhoneNumber, getUsername} from "../../../../../context/authenticationSlice.ts";


export type FieldProps = {
    input: string,
    label: string
}
export type ProfileFieldProps = {
    name: string;
    username: string;
    email: string;
    phone: string;
}

export function ProfileField({input, label}: FieldProps) {
    return (
        <TextField
            id="outlined-read-only-input"
            label={label}
            defaultValue={input}
            sx={{'& .MuiInputBase-input': {color: 'black'}}}
            slotProps={{
                input: {
                    readOnly: true,
                },
            }}/>
    )
}

export function ProfileFields({name, username, email, phone}: ProfileFieldProps) {
    return (
        <div className="flex flex-col p-4 m-4 gap-4 max-w-96">
            <ProfileField input={name} label="Name"/>
            <ProfileField input={username} label="Username"/>
            <ProfileField input={email} label="Email"/>
            <ProfileField input={phone} label="Phone"/>
        </div>
    )
}

export function SettingsPage() {
    const name = useSelector(getName);
    const email = useSelector(getEmail);
    const username = useSelector(getUsername);
    const phone = useSelector(getPhoneNumber);
    console.log("email:", email, "username:", username);
    const user: ProfileFieldProps = {name, username, email, phone};
    return (
        <div>
            <CommonFrame commonFrameType={"RESIDENT"}>
                <div className="settingsPage flex flex-col">
                    <div className="contents w-fit">
                        <div className="profile-settings text-left">
                            <h1>Profile</h1>
                            <ProfileFields name={user.name}
                                           username={user.username}
                                           email={user.email} phone={user.phone}/>
                        </div>
                        <div className="security-settings flex flex-col text-left">
                            <h1>Security</h1>
                            <Button className="text-left font-bold">Change password</Button>
                        </div>
                    </div>
                </div>
            </CommonFrame>
        </div>
    )
}