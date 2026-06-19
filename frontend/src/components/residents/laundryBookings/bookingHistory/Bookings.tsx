import BookingsTable, {type bookingData} from "./BookingsTable.tsx";

export function RecentBookings() {
    const rows: bookingData[] = [{
        event_title: 'Washing hoodie',
        start_time: '11:00', end_time: '12:00', date: '06/17/26', machine_num: 1
    }];

    return (
        <div>
            <BookingsTable rows={rows}/>
        </div>
    )
}

export function PastBookings() {
    const rows: bookingData[] = [{
        event_title: 'Washing me socks',
        start_time: '13:00', end_time: '14:00', date: '06/10/26', machine_num: 3
    }];

    return (
        <div>
            <BookingsTable rows={rows}/>
        </div>
    )

}