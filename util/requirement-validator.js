
function isInPast(year, month, day, hour, minute) {
    const todayDate = Date.now();
    let reqDate = {};
    if (hour !== undefined) {
        const todayDate = new Date(year, month-1, day, hour, minute);
        todayDate.setHours(todayDate.getHours() - 5);
        todayDate.setMinutes(todayDate.getMinutes() - 30);
        reqDate = Date.UTC(year, month-1, day, todayDate.getHours(), todayDate.getMinutes());

    } else if (day !== undefined) {
        reqDate = Date.UTC(year, month - 1, day);
    } else {
        reqDate = Date.UTC(year, month);
    }
    return reqDate < todayDate;

}

// function is4HoursInAdvance(year, month, day, hour, minute) {
//     const todayDate = new Date(Date.now());
//     const plus4Hours = todayDate.setUTCHours(todayDate.getUTCHours() + 4);
//     const reqDate = Date.UTC(year, month-1, day, hour, minute);
//     return reqDate > plus4Hours;
// }

function isInBookableTimeframe(year, month, day, hour, minute) {
    if (hour !== undefined) {
        const reqDate = new Date(Date.UTC(year, month-1, day, hour, minute));
        const reqDay = reqDate.getUTCDay();
        if ( reqDay === 0) return false; // 6 is Saturday, 0 is Sunday.
        const reqHour = reqDate.getUTCHours();
        if (reqHour < 9 || reqHour > 24) return false;
    } else {
        const reqDate = new Date(Date.UTC(year, month-1, day));
        const reqDay = reqDate.getUTCDay();
        if ( reqDay === 0) return false; // 6 is Saturday, 0 is Sunday.
    }
    return true;
}

function checkMissingInputs(year, month, day, hour, minute) {
    if (!year) return {success: false, message: 'Request is missing parameter: year'};
    if (!month) return {success: false, message: 'Request is missing parameter: month'};
    if (!day) return {success: false, message: 'Request is missing parameter: day'};
    if (!hour) return {success: false, message: 'Request is missing parameter: hour'};
    if (!minute) return {success: false, message: 'Request is missing parameter: minute'};
}


function validateBooking(year, month, day, hour, minute) {
    const missingInputs = checkMissingInputs(year, month, day, hour, minute);
    if (missingInputs) return missingInputs;
    if (isInPast(year, month, day, hour, minute))
        return {success: false, message: 'Cannot book time in the past'};
    if (!isInBookableTimeframe(year, month, day, hour, minute))
        return {success: false, message: 'Cannot book outside bookable timeframe'};
    // if (!is4HoursInAdvance(year, month, day, hour, minute))
    //     return {success: false, message: 'Cannot book with less than 24 hours in advance'};
}

function validateGetTimeslots(year, month, day) {
    const missingInputs = checkMissingInputs(year, month, day, '0', '0');
    if (missingInputs) return missingInputs;
    if (isInPast(year, month, day, undefined, undefined))
        return {success: false, message: 'No timeslots are available in the past'};
    if (!isInBookableTimeframe(year, month, day, undefined, undefined))
        return {success: false, message: 'No timeslots exist outside bookable timeframe'};
}

function validateGetDays(year, month) {
    const missingInputs = checkMissingInputs(year, month, '0', '0', '0');
    if (missingInputs) return missingInputs;
    if (isInPast(year, month, undefined, undefined, undefined))
        return {success: false, message: 'No timeslots are available in the past'};
}

module.exports = {
    checkMissingInputs,
    validateBooking,
    validateGetTimeslots,
    validateGetDays
};