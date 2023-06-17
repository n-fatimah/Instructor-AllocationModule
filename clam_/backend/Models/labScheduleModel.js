const mongoose=require('mongoose');

const labScheduleSchema=mongoose.Schema({
    instructorId:{
        type:Number
    },
    labName:{
        type:String
    },
    labCode:{
        type:String
    },
    timeSlotId:{
        type:Number
    }
})

module.exports = mongoose.model("labScheduleSchema", labScheduleSchema);