export function useGetHumanReadableTime(){
    const getTime = (timestamp: number) => {
        const date = new Date(timestamp * 1000);
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