import {useState} from "react";
import {toast} from "sonner";

export function useAdminAccountCreationDialog() {
    const [isOpen, setIsOpen] = useState(false);
    const closeModal = () => {
        setIsOpen(false);
    }

    const onSuccessCallBack = () => {
        closeModal();
        toast.success("Successfully created account!");
    }

    return {
        isOpen,
        setIsOpen,
        closeModal,
        onSuccessCallBack
    }

}