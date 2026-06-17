import {CommonFrame} from "../../../../../components/common/CommonFrame.tsx";
import {FormControlLabel, FormGroup, Switch, TextField} from "@mui/material";


export type FieldProps = {
    input: string
}
export type ProfileFieldProps = {
    name: string,
    email: string,
    phone: string
}

export function NotificationControls() {
    return (
        <>
            <FormGroup>
                <FormControlLabel control={<Switch defaultChecked/>} label="Email Notifications"/>
                <FormControlLabel control={<Switch defaultChecked/>} label="Maintenance Notifications"/>
                <FormControlLabel control={<Switch defaultChecked/>} label="Notice Alerts"/>
            </FormGroup>
        </>
    )
}

export function ProfileField({input}: FieldProps) {
    return (
        <>
            <TextField
                id="outlined-read-only-input"
                label="Read Only"
                defaultValue={input}
                sx={{
                    '& .MuiInputBase-input': {
                        color: 'white'
                    }
                }}
                slotProps={{
                    input: {
                        readOnly: true,
                    },
                }}/>
        </>
    )
}

export function ProfileFields({name, email, phone}: ProfileFieldProps) {
    return (
        <>
            <ProfileField input={name}/>
            <ProfileField input={email}/>
            <ProfileField input={phone}/>
        </>
    )
}

export function SettingsPage() {
    const user: ProfileFieldProps = {name: "Lem Lemmings", email: "lemmings@gmail.com", phone: "12345678"};
    return (
        <>
            <CommonFrame commonFrameType={"RESIDENT"}/>
            <div className={"settingsPage"}>
                <div className={"profile-settings"}>
                    <h1>Profile</h1>
                    <ProfileFields name={user.name}
                                   email={user.email} phone={user.phone}/>
                </div>
                <div className={"notifications-settings"}>
                    <h1>Notifications</h1>
                    <NotificationControls/>
                </div>
                <div className={"security-settings"}>
                    <h1>Security</h1>
                    <p>Change password</p>
                    <FormControlLabel control={<Switch defaultChecked/>} label="Two factor auth"/>
                </div>
            </div>
        </>
    )
}