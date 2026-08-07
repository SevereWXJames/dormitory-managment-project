import {DialogComponent} from "@/components/common/Dialog/DialogComponent.tsx";
import {
    useAdminAccountCreationDialog
} from "@/components/admin/AdminAccountCreation/hooks/useAdminAccountCreationDialog.tsx";
import {Role} from "@/dataTypes/user.ts";
import {SignUpForm} from "@/components/common/Auth/SignUpForm.tsx";

export function AdminAccountCreationDialog() {
    const title = "Create an admin account";
    const description = "Fill out the fields required below.";
    const {onSuccessCallBack, isOpen, closeModal, onOpenChange} = useAdminAccountCreationDialog();
    return (

        <DialogComponent isOpen={isOpen}
                         title={title}
                         description={description}
                         displayDefaultButtons={false}
                         onOpenChange={onOpenChange}
                         children={<SignUpForm role={Role.ADMIN}
                                               onSuccessCallback={onSuccessCallBack}
                                               onHandleCancel={closeModal}/>}
        />

    )
}