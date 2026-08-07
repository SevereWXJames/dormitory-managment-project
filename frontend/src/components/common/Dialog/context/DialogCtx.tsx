import {createContext, type ReactNode} from "react";


type DialogCtxValue = {
    isOpen: boolean;
    content: ReactNode | null;
    openModal: (content: ReactNode | null) => void;
    closeModal: () => void;
};

export const DialogCtx = createContext<DialogCtxValue | undefined>(undefined);