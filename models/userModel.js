var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSch = new Schema({
    _id:{
        type:String,
        required:true
    },
    activationStatus:{
        type:Number,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    appointmentSlots:{
        type:Array,
        required:true

    }
});

var userModel = mongoose.model('user',userSch);

module.exports = userModel;
