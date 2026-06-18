import {CommonFrame} from "../../../../../components/common/CommonFrame.tsx";
import { NoticeCard } from "../../../../../components/residents/notices/NoticeCard.tsx";

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
                <NoticeCard title="sample title 1">
                    Sample content
                </NoticeCard>
                <h1>Read</h1>
            </div>
        </>
    )
}