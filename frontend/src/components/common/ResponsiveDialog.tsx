// import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import {useTheme} from '@mui/material/styles';

export type ResponsiveDialogProps = {
    open: boolean;
    handleClose: () => void;
    title?: string;
    content?: React.ReactNode;
    actions?: React.ReactNode;
}

export function ResponsiveDialog(props: ResponsiveDialogProps) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    return (<div>
            <Dialog fullScreen={fullScreen}
                    open={props.open}
                    onClose={props.handleClose}
                    aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title"
                             sx={{color: 'black'}}>
                    {props.title}
                </DialogTitle>
                <DialogContent>{props.content}</DialogContent>
                <DialogActions>{props.actions}</DialogActions>
            </Dialog>
        </div>
    );
}


// export function ResponsiveDialog(props : ResponsiveDialogProps) {
//     const theme = useTheme();
//     const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
//
//     return (<div>
//             <Dialog
//                 fullScreen={fullScreen}
//                 open={props.open}
//                 onClose={props.handleClose}
//                 aria-labelledby="responsive-dialog-title"
//             >
//                 <DialogTitle
//                     id="responsive-dialog-title"
//                     sx={{color: 'black'}}>
//                     {"Calendar"}
//                 </DialogTitle>
//                 <DialogContent>
//                     <DialogContentText>
//                         Default text here.
//                     </DialogContentText>
//                 </DialogContent>
//                 <DialogActions>
//                     <Button autoFocus onClick={props.handleClose}>
//                         Disagree
//                     </Button>
//                     <Button onClick={props.handleClose} autoFocus>
//                         Agree
//                     </Button>
//                 </DialogActions>
//             </Dialog>
//         </div>
//     );
// }
