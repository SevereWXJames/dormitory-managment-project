import type {Dispatch, SetStateAction} from "react";

type TableButtonProps = {
    setSelectedSort: Dispatch<SetStateAction<string | null>>;
    buttonName: string;
}

export function TableButton(props: TableButtonProps) {
    return (
        <button
            type="button"
            className="pill-button"
            onClick={() => {
                console.log(`clicked ${props.buttonName}`)
                props.setSelectedSort(props.buttonName)}}>{props.buttonName}
        </button>);
}