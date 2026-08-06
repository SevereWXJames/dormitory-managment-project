type TableButtonProps = {
    setSelectedSort: (sortBy: string) => void;
    buttonName: string;
}

export function TableButton(props: TableButtonProps) {
    return (
        <button
            type="button"
            className="pill-button"
            onClick={() => props.setSelectedSort}>{props.buttonName}
        </button>);
}