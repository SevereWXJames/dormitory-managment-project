import {DialogComponent} from "@/components/common/Dialog/DialogComponent.tsx";
import {
    useAdminAccountCreationDialog
} from "@/components/admin/AdminAccountCreation/hooks/useAdminAccountCreationDialog.tsx";
import {AdminAccountCreationForm} from "@/components/admin/AdminAccountCreation/AdminAccountCreationForm.tsx";

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
                         children={<AdminAccountCreationForm
                                               onSuccessCallback={onSuccessCallBack}
                                               onHandleCancel={closeModal}/>}
        />

    )
}