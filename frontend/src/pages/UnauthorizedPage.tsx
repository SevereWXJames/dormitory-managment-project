import {CommonFrame} from "@/components/common/CommonFrame.tsx";
import {Link} from "react-router-dom";

export function UnauthorizedPage(){
    return(
        <CommonFrame commonFrameType="UNAUTHENTICATED">
            <h1>Error: Unauthorized</h1>
            <Link to={'/login'} className="font-medium text-fg-brand hover:underline">Return back to login page</Link>
        </CommonFrame>
    )
}