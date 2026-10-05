import { Card } from "@mui/material";
import {CommonFrame} from "../../../../../components/common/CommonFrame.tsx";

export function HelpPage() {
    return (<>
        <CommonFrame commonFrameType={"RESIDENT"}>
        <div className="helpPage flex flex-col text-left">
            <h1>Common Issues</h1>
            <Card className="p-4">
                <h2>I cannot make a booking</h2>
                <p>Ensure you have enough credit in your account to pay for the booking. You may add credits in the Credits page.</p>
            </Card>
        </div>
        </CommonFrame>
    </>)
}