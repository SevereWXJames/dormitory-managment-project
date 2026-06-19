import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

export type LogoutDialogProps = {
    open: boolean,
    onClose: () => void,
}
export function LogoutDialog({open, onClose} : LogoutDialogProps) {
    return (
        <>
            <Dialog
                open={open}
                onClose={onClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                role="alertdialog"
            >
                <DialogTitle id="alert-dialog-title" sx={{ color: "black" }}>
                    {"Are you sure you want to log out?"}
                </DialogTitle>
                <DialogActions>
                    <Button onClick={onClose} autoFocus>
                        Cancel
                    </Button>
                    <Button onClick={onClose}>Yes, log out</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
