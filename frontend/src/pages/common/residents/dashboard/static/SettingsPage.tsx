import {CommonFrame} from "../../../../../components/common/CommonFrame.tsx";
import {FormControlLabel, FormGroup, Switch, TextField} from "@mui/material";
import {useSelector} from "react-redux";
import {getEmail, getUsername} from "../../../../../context/authenticationSlice.ts";


export type FieldProps = {
    input: string
}
export type ProfileFieldProps = {
    name: string;
    username: string;
    email: string;
    phone: string;
}

export function NotificationControls() {
    return (
        <div>
            <FormGroup>
                <FormControlLabel control={<Switch defaultChecked/>} label="Email Notifications"/>
                <FormControlLabel control={<Switch defaultChecked/>} label="Maintenance Notifications"/>
                <FormControlLabel control={<Switch defaultChecked/>} label="Notice Alerts"/>
            </FormGroup>
        </div>
    )
}

export function ProfileField({input}: FieldProps) {
    return (
        <div>
            <TextField
                id="outlined-read-only-input"
                label="Read Only"
                defaultValue={input}
                sx={{'& .MuiInputBase-input': {color: 'white'}}}
                slotProps={{
                    input: {
                        readOnly: true,
                    },
                }}/>
        </div>
    )
}

export function ProfileFields({name, username, email, phone}: ProfileFieldProps) {
    return (
        <div>
            <ProfileField input={name}/>
            <ProfileField input={username}/>
            <ProfileField input={email}/>
            <ProfileField input={phone}/>
        </div>
    )
}

export function SettingsPage() {
    const email = useSelector(getEmail);
    const username = useSelector(getUsername);
    console.log("email:", email, "username:", username);
    const user: ProfileFieldProps = {name: "Lem Lemmings", username, email, phone: "12345678"};
    return (
        <div>
            <CommonFrame commonFrameType={"RESIDENT"}>
            <div className={"settingsPage"}>
                <div className={"contents"}>
                    <div className={"profile-settings"}>
                        <h1>Profile</h1>
                        <ProfileFields name={user.name}
                                       username={user.username}
                                       email={user.email} phone={user.phone}/>
                    </div>
                    <div className={"notifications-settings"}>
                        <h1>Notifications</h1>
                        <NotificationControls/>
                    </div>
                    <div className={"security-settings"}>
                        <h1>Security</h1>
                        <button>Change password</button>
                        <FormControlLabel control={<Switch defaultChecked/>} label="Two factor auth"/>
                    </div>
                </div>
            </div>
            </CommonFrame>
        </div>
    )
}