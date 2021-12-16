var router = require('express').Router();
var availableCont = require('../controllers/availableDaysController');

router
.get('/day', availableCont.handleGetDays)
.get('/timeslots',availableCont.handleGetTimeslots)

module.exports = router