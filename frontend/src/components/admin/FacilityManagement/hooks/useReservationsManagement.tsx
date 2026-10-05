import {useState} from "react";

export function useReservationsManagement(){
    const [sortSelection, setSortSelection] = useState<string | null>(null);
    return {sortSelection, setSortSelection};
}