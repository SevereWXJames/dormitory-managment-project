import {createContext} from "react";


type DialogCtxValue = {
    isOpen: boolean;
    openModal: () => void;
    closeModal: () => void;
};

export const DialogCtx = createContext<DialogCtxValue | undefined>(undefined);