import {createContext} from "react";


type DialogCtxValue = {
    isOpen: boolean;
    openModal: () => void;
    closeModal: () => void;
    onOpenChange: (open: boolean) => void;
};

export const AdminAccountDialogCtx = createContext<DialogCtxValue | undefined>(undefined);