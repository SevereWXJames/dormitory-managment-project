import {DialogComponent} from "@/components/common/Dialog/DialogComponent.tsx";
import {
    useAdminAccountCreationDialog
} from "@/components/admin/AdminAccountCreation/hooks/useAdminAccountCreationDialog.tsx";
import {Role} from "@/dataTypes/user.ts";
import {SignUpForm} from "@/components/common/Auth/SignUpForm.tsx";
import {DialogCtxProvider} from "@/components/common/Dialog/context/DialogCtxProvider.tsx";

export function AdminAccountCreationDialog() {
    const title = "Create an admin account";
    const description = "Fill out the fields required below.";
    const {onSuccessCallBack, isOpen, closeModal} = useAdminAccountCreationDialog();
    return (
        <DialogCtxProvider>
            <DialogComponent isOpen={isOpen}
                             title={title}
                             description={description}
                             displayDefaultButtons={false}
                             children={<SignUpForm role={Role.ADMIN}
                                                   onSuccessCallback={onSuccessCallBack}
                                                   onHandleCancel={closeModal}/>}
            />
        </DialogCtxProvider>


    )
}