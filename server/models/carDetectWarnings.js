const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const carDetSchema = new Schema({
    warning_id:{
        type:Number,
        required: true,
    },
    driver_id:{
        type:String,
        required: true,
    },
    pace:{
        type: Number,
    },
    crossingline:{
        type:String,
    },
    location:{
        type:[Number],
    },
    /* collision:{
        type:String,
    }, */
    objectsDistanceList:{
        type:[Number],
    },
    objectsTypeList:{
        type:[String],
    },
    warning:{
        type: Boolean,
    },
    warningMessage:{
        type: String,
    },
    timestringserver:{
        type: String,

    },
    timeNumber:{
        type: Number,
    },
    image:{
        type:String,
    }
})


const carDetectWarnings = mongoose.model('carDetectWarnings', carDetSchema);
//ImageRecord(DRIVER_ID, display, speed, crossingline, virtual_location, dictvaluelist, dictkeylist, warning, warningMessage, timestring, time.time())
module.exports = carDetectWarnings;