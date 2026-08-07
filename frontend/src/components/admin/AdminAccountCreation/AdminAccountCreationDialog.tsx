import {DialogWindow} from "@/components/common/DialogWindow.tsx";
import {
    useAdminAccountCreationDialog
} from "@/components/admin/AdminAccountCreation/hooks/useAdminAccountCreationDialog.tsx";
import {Role} from "@/dataTypes/user.ts";
import {SignUpForm} from "@/components/common/Auth/SignUpForm.tsx";
import {AdminAccountDialogContext} from "@/components/admin/AdminAccountCreation/context/AdminAccountDialogContext.tsx";

export function AdminAccountCreationDialog() {
    const title = "Create an admin account";
    const description = "Fill out the fields required below.";
    const {onConfirm, onCancel, isOpen} = useAdminAccountCreationDialog();

    return (
        <AdminAccountDialogContext.Provider value={{isDialogOpen: isOpen}}>
            <DialogWindow isOpen={isOpen}
                          onConfirm={onConfirm}
                          onCancel={onCancel}
                          title={title}
                          description={description}
                          displayDefaultButtons={false}
                          children={<SignUpForm role={Role.ADMIN}/>}/>
        </AdminAccountDialogContext.Provider>

    )
}