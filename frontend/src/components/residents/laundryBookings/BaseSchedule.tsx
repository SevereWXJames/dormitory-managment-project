import {BaseCalendar, type CalendarEvent} from "./BaseCalendar.tsx";

export type BaseScheduleProps = {
    events: CalendarEvent[]
}

export function BaseSchedule({events} : BaseScheduleProps){
    return <BaseCalendar events={events} />;
}