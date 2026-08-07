// ModalContext.jsx
import {useState, useCallback, type ReactNode} from 'react';
import {DialogCtx} from "@/components/common/Dialog/context/DialogCtx.tsx";

type DialogCtxProviderProps =
{
    children: ReactNode;
}

export function DialogCtxProvider( {children} : DialogCtxProviderProps) {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = useCallback(() => {
        setIsOpen(true);
    }, []);

    const closeModal = useCallback(() => {
        setIsOpen(false);
    }, []);

    return (
        <DialogCtx.Provider value={{ isOpen, openModal, closeModal }}>
            {children}
        </DialogCtx.Provider>
    );
}

