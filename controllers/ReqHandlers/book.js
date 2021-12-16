const fs = require('fs');
const {google} = require('googleapis');
const reqValidator = require('../../util/requirement-validator.js');
const appUtil = require('../../util/appUtil.js');

const TIMESLOTS_PATH = './util/timeslots.json';

function findMatchingTimeslot(timeslots, year, month, day, hour, minute) {
    const timeslotDate = new Date(Date.UTC(year, month-1, day, hour, minute)).toISOString();
    const foundTimeslot = timeslots.find(function (element) {
        //const elementDate = new Date(element.startTime).toISOString(); // Ensure matching ISO format.
        return element.startTime.includes(hour + ':' + minute  + ':00');
    });
    if (!foundTimeslot) return false;
    return {time: foundTimeslot, date: timeslotDate};
}
function bookAppointment(auth, year, month, day, hour, minute,summary) {
    return new Promise(function(resolve, reject) {
        const isInvalid = reqValidator.validateBooking(year, month, day, hour, minute);
        if (isInvalid) return reject(isInvalid);

        const timeslots = (JSON.parse(fs.readFileSync(TIMESLOTS_PATH))).timeslots;
        const timeslot = findMatchingTimeslot(timeslots, year, month, day, hour, minute);
        if (!timeslot) return resolve({success: false, message: 'Invalid time slot'});
        const date = year + '-' + month + '-' + day;
        const event = appUtil.makeEventResource(date, timeslot.time.startTime, timeslot.time.endTime,summary);

        const calendar = google.calendar({version: 'v3', auth});
        calendar.events.insert({
            auth: auth,
            calendarId: 'primary',
            resource: event
        }, function (err, res) {
            if (err) return console.log('Error contacting the Calendar service: ' + err);
            const event = res.data;
            console.log('Appointment created: ', event.id);
            const result = {startTime: event.start.dateTime, endTime: event.end.dateTime};
            const response = Object.assign({success: true}, result);
            return resolve(response);
        });
    });
}

module.exports = {
    bookAppointment
};