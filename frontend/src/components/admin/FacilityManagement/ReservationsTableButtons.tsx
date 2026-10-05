import {TableButton} from "@/components/admin/FacilityManagement/TableButton.tsx";
import type {Dispatch, SetStateAction} from "react";

type ReservationsTableButtonsProps = {
    setSortSelection: Dispatch<SetStateAction<string | null>>;
}

export function ReservationsTableButtons(props: ReservationsTableButtonsProps) {
    const sortOptions = ["upcoming", "service"];

    return (<div className="flex justify-start m-4">
        {sortOptions.map(sortOption =>
            <TableButton key={sortOption}
                setSelectedSort={props.setSortSelection}
                buttonName={sortOption}/>)}
    </div>)
}