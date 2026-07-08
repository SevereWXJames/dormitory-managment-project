import {CommonFrame} from "@/components/common/CommonFrame.tsx";

export function UnauthorizedPage(){
    return(
        <CommonFrame commonFrameType="UNAUTHENTICATED">
            <h1>Error: Unauthorized</h1>
        </CommonFrame>
    )
}