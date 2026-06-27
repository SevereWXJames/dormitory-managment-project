import {CommonFrame} from "../../../../../components/common/CommonFrame.tsx";
import { NoticeCard } from "../../../../../components/residents/notices/NoticeCard.tsx";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserId } from "../../../../../context/authenticationSlice.ts";
import { fetchJson } from "../../../../../utils/api.ts";
import type { Notice } from "../../../../../dataTypes/notice.ts";

export interface NoticesPageProps {
    read_notices: object[],
    unread_notices: object[]
}

export function NoticesPage() {
    const userId = useSelector(getUserId);
    const [notices, setNotices] = useState<Notice[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const load = async () => {
            if (!userId) {
                setError("User not authenticated.");
                setLoading(false);
                return;
            }

            try {
                const data = await fetchJson<Notice[]>(`/notices/get-for-user/${encodeURIComponent(userId)}`);
                setNotices(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Unable to load notices.");
            } finally {
                setLoading(false);
            }
        };

        load();
    }, [userId]);

    return (
        <>
            <CommonFrame commonFrameType={"RESIDENT"}/>
            <div className="notices-page">
                <h1>Notices</h1>
                {loading && <p>Loading notices...</p>}
                {error && <p style={{ color: "red" }}>{error}</p>}
                {!loading && !error && (
                    <Box className="card-container">
                        {notices.length === 0 && <p>No notices available.</p>}
                        {notices.map((n) => (
                            <NoticeCard key={n._id} title={n.title}>{n.text}</NoticeCard>
                        ))}
                    </Box>
                )}
            </div>
        </>
    )
}