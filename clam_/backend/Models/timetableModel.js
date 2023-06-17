const mongoose = require("mongoose");

const timetableSchema = new mongoose.Schema({
    day: String,
    time: String,
    course: String,
    room: String,
    code: String,
    timeslot_id: Number,
    instructor: String,
});

timetableSchema.index({ course: 1, code: 1 }, { unique: true });
// Create model for timetable collection
const Timetable = mongoose.model("timetable", timetableSchema);

module.exports = Timetable;