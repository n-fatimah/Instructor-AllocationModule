const mongoose = require("mongoose");

const labtimetableSchema = new mongoose.Schema({
    day: String,
    time: String,
    course: String,
    room: String,
    code: String,
    timeslot_id: Number,
    instructor1: String,
    instructor2: String,
});

labtimetableSchema.index({ course: 1, code: 1 }, { unique: true });
// Create model for timetable collection
const labtimetable = mongoose.model("labtimetable", labtimetableSchema);

module.exports = labtimetable;