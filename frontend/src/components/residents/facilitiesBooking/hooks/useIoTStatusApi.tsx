import {useGetIotStatusByUUIDQuery} from "@/context/api/apiServices/iotApi.ts";

type useIoTStatusApiProps = {
    uuid: string;
}

export function useIoTStatusApi(props: useIoTStatusApiProps){
    const {data: status, isLoading, isError, error} = useGetIotStatusByUUIDQuery(
        {iotUUID: props.uuid});

    return{status, isLoading, isError, error}
}