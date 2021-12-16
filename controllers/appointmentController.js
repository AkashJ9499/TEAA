const book = require('./ReqHandlers/book.js');
function handleBookAppointment(req, res) {
    
    const year = req.query.year;
    const month = req.query.month;
    const day = req.query.day;
    const hour = req.query.hour;
    const minute = req.query.minute;
    book.bookAppointment(this.auth, year, month, day, hour, minute,req.query.summary)
        .then(function(data) {
            res.send(data);
        })
        .catch(function(data) {
            res.send(data);
        });
}
module.exports={
    handleBookAppointment
}