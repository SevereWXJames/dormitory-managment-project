import { CommonFrame } from "../../../components/common/CommonFrame";

export function AdminAccessCodesPage() {
    return (
        <>
            <CommonFrame commonFrameType="BUILDING_MANAGER" />
            <div className="adminAccessCodesPage">
                <h1>Access Codes Management</h1>
                <p>Manage building access codes and resident permissions here.</p>
            </div>
        </>
    );
}
