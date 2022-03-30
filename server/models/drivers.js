const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const driverSchema = new Schema({
    driver_id:{
        type: String,
        required: true,

    },
    mins:{
        type: Number,
        required: true,

    },
    score:{
        type: Number,
    },
    status:{
        type: String,
    }
})

const drivers = mongoose.model('driver', driverSchema);

module.exports = drivers;