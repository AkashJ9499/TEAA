const fs = require('fs');
const {google} = require('googleapis');
const reqValidator = require('../../util/requirement-validator.js');
const appUtil = require('../../util/appUtil.js');

const TIMESLOTS_PATH = './util/timeslots.json';

function getResult(appointments) {
    const timeslots = (JSON.parse(fs.readFileSync(TIMESLOTS_PATH))).timeslots;
    let resultsArr = [];
    for (let i = 0; i < timeslots.length; i++) {
        const found = appointments.find(function (element) {
            const startTime = element.startTime;
            const finalStartTime = startTime.substring(startTime.indexOf("T"), startTime.indexOf("Z") + 1);
            return timeslots[i].startTime.includes(finalStartTime);
        });
        if (!found) {
            resultsArr.push(timeslots[i]);
        }
    }
    console.log(resultsArr)
    return resultsArr;
}
function getAvailTimeslots(auth, year, month, day) {
    return new Promise(function(resolve, reject) {
        const isInvalid = reqValidator.validateGetTimeslots(year, month, day);
        if (isInvalid) return reject(isInvalid);

        const startDate = new Date(Date.UTC(year, month, day));
        const endDate = appUtil.getNextDay(startDate);
        const calendar = google.calendar({version: 'v3', auth});
        calendar.events.list({
            calendarId: 'primary',
            timeMin: startDate.toISOString(),
            timeMax: endDate.toISOString(),
            maxResults: 11,
            singleEvents: true,
            orderBy: 'startTime',
            q: 'appointment'
        }, (err, res) => {
            if (err) return reject({response: 'The API returned an error: ' + err});
            let appointments = res.data.items.map((event, i) => {
                return {startTime: event.start.dateTime, endTime: event.end.dateTime};
            });
            const result = {};
            result.timeslots = getResult(appointments);
            if (result.timeslots[0]) {
                const response = Object.assign({success: true}, result);
                return resolve(response);
            } else {
                const response = Object.assign({success: false}, result);
                return reject(response);
            }
        });
    });
}

module.exports = {
    getAvailTimeslots
};