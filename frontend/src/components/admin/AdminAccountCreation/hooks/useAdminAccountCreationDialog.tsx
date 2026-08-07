import {toast} from "sonner";
import {useDialog} from "@/components/common/Dialog/hooks/useDialog.tsx";

export function useAdminAccountCreationDialog() {

    const { closeModal, isOpen, openModal } = useDialog();

    const onSuccessCallBack = () => {
        closeModal();
        toast.success("Successfully created account!");
    }

    return {
        isOpen,
        closeModal,
        openModal,
        onSuccessCallBack
    }

}