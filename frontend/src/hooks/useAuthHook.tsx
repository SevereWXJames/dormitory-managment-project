import {useRefreshMutation} from "@/context/api/apiServices/authApi.ts";
import {useEffect} from "react";

export function useAuthHook(){
    const [refresh, {isLoading, isUninitialized}] = useRefreshMutation(); // calls /refresh upon mounting

    useEffect(() => {
        refresh();
    }, [refresh]);


    return {
        isLoading,
        isUninitialized
    }
}