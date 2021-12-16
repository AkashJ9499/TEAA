const {google} = require('googleapis');
const reqValidator = require('../../util/requirement-validator.js');
const appUtil = require('../../util/appUtil.js');

function getBookableDays(auth, year, month) {
    return new Promise(function(resolve, reject) {
        const isInvalid = reqValidator.validateGetDays(year, month);
        if (isInvalid) return reject(isInvalid);

        const startDate = new Date(Date.UTC(year, month-1, appUtil.getCurrDateUTC()));
        const endDate = new Date((Date.UTC(year, month)));
        const calendar = google.calendar({version: 'v3', auth});
        calendar.events.list({
            calendarId: 'primary',
            timeMin: startDate.toISOString(),
            timeMax: endDate.toISOString(),
            maxResults: 350,
            singleEvents: true,
            orderBy: 'startTime',
            q: 'appointment'
        }, (err, res) => {
            if (err) return reject({success: false,
                message: 'The API returned an error - ' + err});
            const events = res.data.items;
            const lastDay = appUtil.getLastDayOfMonth(year, month);
            let result = {};
            result.days = makeDaysArr(lastDay, getBookedDays(events));
            const response = Object.assign({success: true}, result);
            resolve(response);
        });
    });
}

function getBookedDays(events) {
    let bookedDays = [];
    let date = null;
    let prevDate = null;
    let dayArr = [];
    for (let event of events) {
        date = appUtil.getDateFromISO(event.start.dateTime);
        if (date === prevDate || prevDate === null) {
            dayArr.push(event);
        } else {
            dayArr = []; // Clear array.
            dayArr.push(event);
        }
        prevDate = appUtil.getDateFromISO(event.start.dateTime);
        if (dayArr.length === 11) {
            dayArr = []; // Clear array.
            bookedDays.push(date);
        }
    }
    return bookedDays;
}

function makeDaysArr(endDate, bookedDays) {
    let daysArr = [];
    for (let i = 1; i <= endDate; i++) {
        if (bookedDays.includes(i)) {
            daysArr.push({"day": i, "hasTimeSlots": false});
        } else {
            daysArr.push({"day": i, "hasTimeSlots": true});
        }
    }
    return daysArr;
}

module.exports = {
    getBookableDays
};