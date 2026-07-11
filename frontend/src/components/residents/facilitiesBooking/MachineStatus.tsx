import {useIoTStatusApi} from "@/components/residents/facilitiesBooking/hooks/useIoTStatusApi.tsx";

type MachineStatusProps = {
    uuid: string,
}


export function MachineStatus({uuid}: MachineStatusProps){
    const {status, isLoading,  isError,  error} = useIoTStatusApi({uuid: uuid});
    if(isLoading) return <div>Loading...</div>;
    else if(isError){
        console.log(`Error getting machine status: ${error}`);
        return <div>Error getting machine status</div>;
    }else if(!status){
        return <div>No status available</div>;
    }

    return(<div className="status flex flex-col sm:flex-row">
        <p>In use: {status.inUse ? "True": "False"}</p>
        <p>Out of service: {status.outOfService ? "True": "False"}</p>
    </div>)
}