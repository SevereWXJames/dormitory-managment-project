// ModalContext.jsx
import {useState, useCallback, type ReactNode} from 'react';
import {DialogCtx} from "@/components/common/Dialog/context/DialogCtx.tsx";

type DialogCtxProviderProps =
{
    children: ReactNode;
}

export function DialogCtxProvider( {children} : DialogCtxProviderProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [content, setContent] = useState<ReactNode | null>(null);

    const openModal = useCallback((content : ReactNode = null) => {
        setContent(content);
        setIsOpen(true);
    }, []);

    const closeModal = useCallback(() => {
        setIsOpen(false);
        setContent(null);
    }, []);

    return (
        <DialogCtx.Provider value={{ isOpen, content, openModal, closeModal }}>
            {children}
        </DialogCtx.Provider>
    );
}

