export function useGetHumanReadableTime(){
    const getTime = (inputDate: Date) => {
        const date = new Date(inputDate);
        const datevalues = {
            year: date.getFullYear(),
            month: date.getMonth()+1,
            monthName: date.toLocaleDateString('en-US', { month: 'long' }),
            dayName: date.getDay(),
            day:date.getDate(),
            timestring: date.toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true,
            }),
            hours: date.getHours(),
            minutes: date.getMinutes(),
            seconds: date.getSeconds(),
        }
        return `${datevalues.monthName} ${datevalues.day}, ${datevalues.timestring}`;
    }
    return{getTime}
}

export function useGetHumanReadableDuration() {
    const getDuration = (seconds: number | undefined) => {
        if (seconds == undefined) {
            return "";
        } else if (seconds % 3600 == 0) {
            return `${seconds/3600}h`;
        }

        return `${seconds/3600}h {seconds%3600}m`;
    };
    return {getDuration};
};