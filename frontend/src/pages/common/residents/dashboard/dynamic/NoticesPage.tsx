import {CommonFrame} from "../../../../../components/common/CommonFrame.tsx";
import { NoticeCard } from "../../../../../components/residents/notices/NoticeCard.tsx";
import data from "../../../../../assets/residents/placeholderData/notices.json";

export interface NoticesPageProps {
    read_notices: object[],
    unread_notices: object[]
}

export function NoticesPage() {
    const noticeCards = <>{data.map((e) => <NoticeCard title={e.title}>{e.body}</NoticeCard>)}</>;

    return (
        <>
            <CommonFrame commonFrameType={"RESIDENT"}/>
            <div className="noticesPage">
                <h1>Notices</h1>
                <h1>Unread</h1>
                    {noticeCards}
                <h1>Read</h1>
            </div>
        </>
    )
}