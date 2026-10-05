import {toast} from "sonner";
import {useContext} from "react";
import {AdminAccountDialogCtx} from "@/components/admin/AdminAccountCreation/context/AdminAccountDialogCtx.tsx";

export function useAdminAccountCreationDialog() {
    const ctx = useContext(AdminAccountDialogCtx);
    if (!ctx) {
        throw new Error('useDialog must be used within a DialogContextProvider');
    }

    const onSuccessCallBack = () => {
        ctx.closeModal();
        toast.success("Successfully created account!");
    }

    return {
        isOpen: ctx.isOpen,
        closeModal: ctx.closeModal,
        openModal: ctx.openModal,
        onOpenChange: ctx.onOpenChange,
        onSuccessCallBack
    }

}