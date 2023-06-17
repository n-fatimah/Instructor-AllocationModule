const mongoose=require('mongoose');

const courseScheduleSchema=mongoose.Schema({
    instructorId:{
        type:Number
    },
    courseName:{
        type:String
    },
    coursecode:{
        type:String
    },
    timeSlotId:{
        type:Number
    }

})


module.exports = mongoose.model("courseScheduleSchema", courseScheduleSchema);