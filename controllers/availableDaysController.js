const days = require('./ReqHandlers/days.js');
const timeslots = require('./ReqHandlers/timeslots.js');

function handleGetTimeslots(req, res) {
    const year = req.query.year;
    const month = req.query.month;
    const day = req.query.day;
   
    timeslots.getAvailTimeslots(this.auth, year, month, day)
        .then(function(data) {
            res.send(data);
            console.log(data)
        })
        .catch(function(data) {
            res.send(data);
        });
}

function handleGetDays(req, res) {
    const year = req.query.year;
    const month = req.query.month;
    days.getBookableDays(this.auth, year, month)
    .then(function(data) {
        res.send(data);
    })
    .catch(function(data) {
        res.send(data);
    });
}

module.exports = {
    handleGetDays,
    handleGetTimeslots
}