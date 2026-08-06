import {TableButton} from "@/components/admin/FacilityManagement/TableButton.tsx";
import type {Dispatch, SetStateAction} from "react";

type ReservationsTableButtonsProps = {
    setSortSelection: Dispatch<SetStateAction<string | null>>;
}

export function ReservationsTableButtons(props: ReservationsTableButtonsProps) {
    const sortOptions = ["upcoming", "service"];

    return (<div>
        {sortOptions.map(sortOption =>
            <TableButton
                setSelectedSort={() => {
                    props.setSortSelection(sortOption)
                }}
                buttonName={sortOption}/>)}
    </div>)
}