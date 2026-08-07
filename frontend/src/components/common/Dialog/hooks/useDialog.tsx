import {useContext} from "react";
import {DialogCtx} from "@/components/common/Dialog/context/DialogCtx.tsx";

export function useDialogWindowCtx() {
    const ctx = useContext(DialogCtx);
    if (!ctx) {
        throw new Error('useModal must be used within a ModalProvider');
    }
    return ctx;
}