import {ReservationsTable} from "@/components/admin/FacilityManagement/ReservationsTable.tsx";
import {ReservationsTableButtons} from "@/components/admin/FacilityManagement/ReservationsTableButtons.tsx";
import {useReservationsManagement} from "@/components/admin/FacilityManagement/hooks/useReservationsManagement.tsx";

export function ReservationsManagement() {
    const {sortSelection, setSortSelection} = useReservationsManagement();
    return (
        <div>
            <ReservationsTableButtons setSortSelection={setSortSelection}/>
            <ReservationsTable sortSelection={sortSelection}/>
        </div>
    )
}