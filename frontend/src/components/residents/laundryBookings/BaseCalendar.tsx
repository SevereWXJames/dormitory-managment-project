import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';

export type CalendarEvent = {
    id: string;
    title: string;
    start: string;
    end: string;
    color?: string;
}

export type BaseCalendarProps = {
    events: CalendarEvent[];
}

export function BaseCalendar({ events }: BaseCalendarProps) {
    return (
        <FullCalendar
            plugins={[timeGridPlugin, dayGridPlugin]}
            initialView="timeGridWeek"
            headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay'
            }}
            slotMinTime="07:00:00"
            slotMaxTime="18:00:00"
            allDaySlot={false}
            events={events}
            height="500px"
        />
    );
}