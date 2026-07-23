import {useIoTStatusApi} from "@/components/residents/facilitiesBooking/hooks/useIoTStatusApi.tsx";
import {useDialogOpen} from "@/components/residents/facilitiesBooking/context/DialogOpenContext.tsx";

type MachineStatusProps = {
    uuid: string,
}


export function MachineStatus({uuid}: MachineStatusProps){
    const isOpen = useDialogOpen();
    const {status, isLoading,  isError,  error} = useIoTStatusApi({uuid: uuid, isOpen});
    if(isLoading) return <div>Loading...</div>;
    else if(isError){
        console.log(`Error getting machine status: ${error}`);
        return <div>Error getting machine status</div>;
    }else if(!status){
        return <div>No status available</div>;
    }

    const statusText = () => {
        if (status.outOfService) {
            return "Out of service";
        } else if (status.inUse) {
            return "In use";
        } else {
            return "Available";
        }
    }

    return(<div className="status flex flex-col sm:flex-row text-bold">
        <p>Status: {statusText()}</p>
    </div>);
}