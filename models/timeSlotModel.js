var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var timeSlotSch = new Schema({
    _id:{
        type:Number,
        required:true
    },
    timeSlotString:{
        type:String,
        required:true
    },
    status:{
        type:Number,
        required:true
    }
});

var timeSlotModel = mongoose.model('timeSlot',timeSlotSch);

module.exports = timeSlotModel;
