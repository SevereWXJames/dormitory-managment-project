import MachineMenu from "./MachineMenu.tsx";
import {useCheckMachineStatus} from "./useCheckMachineStatus.tsx";
import {ResponsiveDialog} from "../../../common/ResponsiveDialog.tsx";

export type CheckMachineStatusProps = {
    machines: string[];
}

export function CheckMachineStatus(){
    const {machine, handleChange, onSubmit, onClose, open} = useCheckMachineStatus();
    const dialogContent = <div>Status of {machine}: Idle</div>
    const actions = <div>
        <button onClick={onClose}>Exit</button>
    </div>
    return(<div>
        <MachineMenu machine={machine} handleChange={handleChange}/>
        <button onClick={onSubmit}>Submit</button>
        <ResponsiveDialog open={open} handleClose={onClose} content={dialogContent} actions={actions}/>
    </div>)
}