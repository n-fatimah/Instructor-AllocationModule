// const express = require('express');
// const router = express.Router();
// const mongoose = require('mongoose');

// // Define a schema for the Course model
// const courseSchema = new mongoose.Schema({
//     timeSlotId: String,
//     courseName: String,
//     slotId: String,
// });

// // Define a model for the Course collection
// const Course = mongoose.model('slot', courseSchema);

// // Route to get all courses
// router.get('/courses', async (req, res) => {
//     try {
//         const courses = await Course.find();
//         res.json(courses);
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({ message: 'Server Error' });
//     }
// });

// // I want to get the courses for a particular time slot and slot id
// router.get('/courses/:timeSlotId/:slotId', async (req, res) => {
//     try {
//         const courses = await Course.find({ timeSlotId: req.params.timeSlotId, slotId: req.params.slotId });
//         res.json(courses);
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({ message: 'Server Error' });
//     }
// });

// // get the course by name
// router.get('/courses/:courseName', async (req, res) => {
//     try {
//         const courses = await Course.find({ courseName: req.params.courseName });
//         res.json(courses);
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({ message: 'Server Error' });
//     }
// });

// // allocate a course to an instructor for a particular time slot and slot id
// // but first check for any scheduling conflicts using CIR
// // check if the same course and slot is already allocated to the instructor
// // if there are no conflicts, allocate the course to the instructor and update the database
// // if there are conflicts, send a message to the user indicating the conflict and suggest alternate timings or instructors.
// router.post('/courses/allocateCourse', async (req, res) => {
//     const { timeSlotId, courseName, slotId } = req.body;
//     try {
//         const course = await Course.findOne({ timeSlotId: timeSlotId, courseName: courseName, slotId: slotId });
//         if (course) {
//             return res.status(400).json({ message: 'Course already exists' });
//         }
//         const newCourse = new Course({
//             timeSlotId: timeSlotId,
//             courseName: courseName,
//             slotId: slotId,
//         });
//         await newCourse.save();
//         res.json(newCourse);
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({ message: 'Server Error' });
//     }
// });

// 2_31

// module.exports = router;
