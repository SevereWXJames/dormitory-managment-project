import {DialogWindow} from "@/components/common/DialogWindow.tsx";
import {
    useAdminAccountCreationDialog
} from "@/components/admin/AdminAccountCreation/hooks/useAdminAccountCreationDialog.tsx";
import {Role} from "@/dataTypes/user.ts";
import {SignUpForm} from "@/components/common/Auth/SignUpForm.tsx";

export function AdminAccountCreationDialog() {
    const title = "Create an admin account";
    const description = "Fill out the fields required below.";
    const {onSuccessCallBack, isOpen} = useAdminAccountCreationDialog();

    return (
            <DialogWindow isOpen={isOpen}
                          title={title}
                          description={description}
                          displayDefaultButtons={false}
                          children={<SignUpForm role={Role.ADMIN}
                                                onSuccessCallback={onSuccessCallBack}/>}
            />

    )
}