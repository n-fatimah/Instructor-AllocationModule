const Timetable = require("../../Models/courseScheduleModel");

const getData = async (req, res) => {
  try {
    const data = await Timetable.find();
    console.log("dataaaa");
    console.log(data);
    res.status(200).json(data);

  } catch (err) {
    console.error(err);
    
    res.status(500).json({ message: "Server error" });
  }

};




const allocateInstructor = async (req, res) => {
    const { courseName, timeSlotId, instructorId } = req.body;
    
    try {
    const timetable = await Timetable.findOne({ courseName, timeSlotId });
    if (!timetable) {
        return res.status(404).json({ success: false, message: 'Timetable not found' });
      }
      
      timetable.instructorId = instructorId;
      await timetable.save();
      
      res.status(200).json({ success: true, message: 'Instructor allocated successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Failed to allocate instructor' });
        }
 
    };      



const User = require("../../Models/userModel");

const getCourseInstructors = async (req, res) => {
  try {
    const instructors = await User.find({ role: 0 }, "name personalid");
    res.status(200).json(instructors);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

//get name and id of lab instructors role=1 for lab


const getLabInstructors = async (req, res) => {
  try {
    const instructors = await User.find({ role: 1 }, "name personalid");
    res.status(200).json(instructors);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
const LabTimetable = require("../../Models/labScheduleModel");
const allocate_labInstructors = async (req, res) => {
  const { labName, timeSlotId, instructorId } = req.body;
  
  try {
  const labtimetable = await LabTimetable.findOne({ labName, timeSlotId });
  if (!labtimetable) {
      return res.status(404).json({ success: false, message: 'Timetable not found' });
    }
    
    labtimetable.instructorId = instructorId;
    await labtimetable.save();
    
    res.status(200).json({ success: true, message: 'Instructor allocated successfully' });
  } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: 'Failed to allocate instructor' });
      }

  };      




// const allocate_labInstructors = async (req, res) => {
//   const { course, timeslot_id, instructor1, instructor2 } = req.body;

//   try {
//     const labTimetable = await LabTimetable.findOne({ course, timeslot_id });
//     if (!labTimetable) {
//       return res.status(404).json({ success: false, message: 'Lab timetable not found' });
//     }

//     labTimetable.instructor1 = instructor1;
//     labTimetable.instructor2 = instructor2;
//     await labTimetable.save();

//     res.status(200).json({ success: true, message: 'Instructors allocated successfully' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: 'Failed to allocate instructors' });
//   }
// };

const getlabData = async (req, res) => {
  try {
    const data = await LabTimetable.find();
    console.log("dataaaa");
    console.log(data);
    res.status(200).json(data);

  } catch (err) {
    console.error(err);
    
    res.status(500).json({ message: "Server error" });
  }

};


module.exports = { getData, allocateInstructor, getCourseInstructors,getLabInstructors,allocate_labInstructors,getlabData};
