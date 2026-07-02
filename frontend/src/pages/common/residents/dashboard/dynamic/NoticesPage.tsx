import {CommonFrame} from "../../../../../components/common/CommonFrame.tsx";
import { NoticeCard } from "../../../../../components/residents/notices/NoticeCard.tsx";
import { Box } from "@mui/material";
import {useNoticesData} from "@/pages/common/residents/pageHooks/useNoticesData.tsx";

export function NoticesPage() {
    const {notices, isLoading, isError, error} = useNoticesData();

    return (
        <>
            <CommonFrame commonFrameType={"RESIDENT"}>
            <div className="notices-page">
                <h1>Notices</h1>
                {isLoading && <p>Loading notices...</p>}
                {(isError || !notices) && <p style={{ color: "red" }}>{error}</p>}
                {(!isLoading && !isError && notices) && (
                    <Box className="card-container">
                        {notices.length === 0 && <p>No notices available.</p>}
                        {notices.map((n) => (
                            <NoticeCard key={n._id} title={n.title}>{n.text}</NoticeCard>
                        ))}
                    </Box>
                )}
            </div>
            </CommonFrame>
        </>
    )
}