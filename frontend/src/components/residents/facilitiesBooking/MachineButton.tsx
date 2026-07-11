import {CommonButton} from "@/components/common/CommonButton.tsx";

type MachineButtonProps = {
    text: string,
    value: string,
    onClick?: () => void
}

export function MachineButton(props: MachineButtonProps){
    return(
        <div className={"machine-button-option"}>
            <CommonButton text={props.text} value={props.value} onClick={props.onClick}/>
        </div>
    )
}