import {Button} from "@/components/ui/button"

type CommonButtonProps = {
    text: string
    value: string,
    onClick: () => void;
}

export function CommonButton(props: CommonButtonProps) {
    return (<div className="flex flex-wrap items-center gap-2 md:flex-row">
        <Button variant={"outline"}
                value={props.value}
                onClick={props.onClick}>{props.text}</Button>
    </div>)
}