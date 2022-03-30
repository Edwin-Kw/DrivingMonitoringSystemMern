const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const faceDetSchema = new Schema({
    warning_id:{
        type:Number,
        required: true,
    },
    driver_id:{
        type:String,
        required: true,
    },
    left_hand:{
        type:String,
    },
    right_hand:{
        type:String,
    },
    head_hori:{
        type:String,
    },
    head_vert:{
        type:String,
    },
    timestringserver:{
        type: String,

    },
    timeNumber:{
        type: Number,
    },
    message:{
        type: String,
    },
    image:{
        type:String,
    }
})

//ImageRecord(DRIVER_ID,image,lefthand,righthand,statusH,statusV,timestringserver, time.time())
const faceDetectWarning = mongoose.model('faceDetectWarning', faceDetSchema);

module.exports = faceDetectWarning;