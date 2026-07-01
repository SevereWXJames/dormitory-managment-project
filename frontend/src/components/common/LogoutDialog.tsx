import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import {useDispatch} from "react-redux";
import {logOut} from "../../context/authenticationSlice.ts";
import {useNavigate} from "react-router-dom";

export type LogoutDialogProps = {
    open: boolean,
    onClose: () => void,
}
export function LogoutDialog({open, onClose} : LogoutDialogProps) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    //const state = useSelector(getAuthenticationState);

    const onSubmit = ()=>{
        dispatch(logOut());
        onClose();
        navigate("/login");  // redirect here
    }

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
                    <Button onClick={onSubmit}>Yes, log out</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
