import {useState} from "react";

export function useAdminAccountCreationDialog() {
    const [isOpen, setIsOpen] = useState(false);
    const onConfirm = () => {
        setIsOpen(false);
    };

    const onCancel = () => {
        setIsOpen(false);
    };

    return {
        isOpen,
        onCancel,
        onConfirm,
        setIsOpen
    }

}