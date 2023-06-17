const express = require("express");
const router = express.Router();

const { getData, allocateInstructor,getCourseInstructors,getLabInstructors,allocate_labInstructors,getlabData } = require("../Controllers/CLAM/clamcontroller");
// const {  } = require("../Controllers/CLAM/clamcontroller");
// const {  } = require("../Controllers/CLAM/clamcontroller");

// GET route to retrieve data
router.get("/data", getData);
router.get("/labdata", getlabData);

// PUT route to allocate instructor
router.put("/allocate-instructor", allocateInstructor);
router.put("/allocate-labInstructors", allocate_labInstructors);
// GET route to retrieve list of instructors
router.get("/course-instructors", getCourseInstructors);
router.get("/lab-instructors", getLabInstructors);

module.exports = router;


