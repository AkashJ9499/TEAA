var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var appointmentSch = new Schema({
    _id:{
        type:Number,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    timeSlot:{
        type:Number,
        required:true
    },
    appointmentCreator:{
        type:String,
        required:true

    }
});

var appointmentModel = mongoose.model('appointment',appointmentSch);

module.exports = appointmentModel;
