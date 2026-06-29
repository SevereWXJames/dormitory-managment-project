import {ScrollList} from "@/components/common/ScrollList.tsx";
import {MachineOptions} from "@/components/residents/facilitiesBooking/MachineOptions.tsx";

export function MachineList(){
    const options = <MachineOptions/>
    const props = {children: options, subheader: "Select a laundry machine:"}
    return(<div className={"machineList"}>
        <ScrollList {...props}/>
    </div> )
}