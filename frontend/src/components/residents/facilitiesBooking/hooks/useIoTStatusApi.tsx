import {useGetIotStatusByUUIDQuery} from "@/context/api/apiServices/iotApi.ts";

type useIoTStatusApiProps = {
    uuid: string;
    isOpen: boolean;
}

export function useIoTStatusApi(props: useIoTStatusApiProps){
    const {data: status, isLoading, isError, error} = useGetIotStatusByUUIDQuery(
        {iotUUID: props.uuid}, {skip: !props.isOpen});

    return{status, isLoading, isError, error}
}