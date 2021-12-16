
function getLastDayOfMonth(year, month) {
    return (new Date(Date.UTC(year, month, 0))).getUTCDate();
}

function getCurrDateUTC() {
    const currDate = new Date();
    return currDate.getUTCDate();
}

function getDateFromISO(dateISOString) {
    const date = new Date(dateISOString);
    return date.getUTCDate();
}

function getNextDay(date) {
    let tomorrow = new Date(date);
    tomorrow.setDate(date.getUTCDate() + 1); // Returns epoch value.
    return new Date(tomorrow); // Convert from epoch to Date.
}

function makeEventResource(date, startTime, endTime) {
    var st = date + startTime;
    var end = date + endTime;
    var dateIST_Start = new Date(st);

    dateIST_Start.setHours(dateIST_Start.getHours() - 5); 
    dateIST_Start.setMinutes(dateIST_Start.getMinutes() - 30);

    var dateIST_End = new Date(end);

    dateIST_End.setHours(dateIST_End.getHours() - 5); 
    dateIST_End.setMinutes(dateIST_End.getMinutes() - 30);
    return {
        'summary': 'appointment',
        'start': {
            'dateTime': dateIST_Start,
            'timeZone': 'IST',
        },
        'end': {
            'dateTime': dateIST_End,
            'timeZone': 'IST',
        }
    };
}

module.exports = {
    getLastDayOfMonth,
    getCurrDateUTC,
    getDateFromISO,
    getNextDay,
    makeEventResource
};