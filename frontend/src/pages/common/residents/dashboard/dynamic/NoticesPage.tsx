import {CommonFrame} from "../../../../../components/common/CommonFrame.tsx";
import { NoticeCard } from "../../../../../components/residents/notices/NoticeCard.tsx";
import data from "../../../../../assets/residents/placeholderData/notices.json";
import { Box } from "@mui/material";

export interface NoticesPageProps {
    read_notices: object[],
    unread_notices: object[]
}

export function NoticesPage() {
    const noticeCards = <>{data.map((e) => <NoticeCard title={e.title}>{e.body}</NoticeCard>)}</>;

    return (
        <>
            <CommonFrame commonFrameType={"RESIDENT"}>
            <div className="notices-page">
                <h1>Notices</h1>
                <Box className="card-container">
                    <h2>Unread</h2>
                    {noticeCards}
                </Box>
                <Box className="card-container">
                    <h2>Read</h2>
                </Box>
            </div>
            </CommonFrame>
        </>
    )
}