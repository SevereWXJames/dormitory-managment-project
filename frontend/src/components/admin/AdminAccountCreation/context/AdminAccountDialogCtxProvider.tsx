// ModalContext.jsx
import {useState, useCallback, type ReactNode} from 'react';
import {AdminAccountDialogCtx} from "@/components/admin/AdminAccountCreation/context/AdminAccountDialogCtx.tsx";

type DialogCtxProviderProps =
{
    children: ReactNode;
}

export function AdminAccountDialogCtxProvider({children} : DialogCtxProviderProps) {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = useCallback(() => {
        setIsOpen(true);
    }, []);

    const closeModal = useCallback(() => {
        setIsOpen(false);
    }, []);

    const onOpenChange = (open : boolean) => {
        if(!open){
            closeModal();
        }
    }

    return (
        <AdminAccountDialogCtx.Provider value={{ isOpen, openModal, closeModal, onOpenChange}}>
            {children}
        </AdminAccountDialogCtx.Provider>
    );
}

