import {BaseCalendar, type CalendarEvent} from "./BaseCalendar.tsx";

export type BaseScheduleProps = {
    events: CalendarEvent[]
}

export function BaseSchedule({events} : BaseScheduleProps){
    /*
    Example of events:

      const events = [
        {
            id: '1',
            title: 'Morning Meeting',
            start: '2024-01-01T08:00:00',
            end: '2024-01-01T09:00:00',
            color: '#3498db'
        },
        {
            id: '2',
            title: 'Project Work',
            start: '2024-01-02T09:00:00',
            end: '2024-01-02T12:00:00',
            color: '#2ecc71'
        }
    ];
    * */
    return <BaseCalendar events={events} />;
}