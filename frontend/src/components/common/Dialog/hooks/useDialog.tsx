import {useContext} from "react";
import {DialogCtx} from "@/components/common/Dialog/context/DialogCtx.tsx";

export function useDialog() {
    const ctx = useContext(DialogCtx);
    if (!ctx) {
        throw new Error('useDialog must be used within a DialogContextProvider');
    }
    return ctx;
}