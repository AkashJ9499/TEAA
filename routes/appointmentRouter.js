var router = require('express').Router();
var appointmentCont = require('../controllers/appointmentController');

router
.get('/book', appointmentCont.handleBookAppointment);

module.exports = router;