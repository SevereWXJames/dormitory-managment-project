import {CommonFrame} from "../../../../../components/common/CommonFrame.tsx";

export interface NoticesPageProps {
    read_notices: object[],
    unread_notices: object[]
}

export function NoticesPage() {
    return (
        <>
            <CommonFrame commonFrameType={"RESIDENT"}/>
            <div className="noticesPage">
                <h1>Notices</h1>
                <h1>Unread</h1>
                <h1>Read</h1>
            </div>
        </>
    )
}