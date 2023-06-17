import React from "react";
import Axios from 'axios';
import { useState, useEffect } from 'react';
// import { getCourseInstructors } from './clamController';

function CTimetable() {
  let day_ids=[]
  let slot_ids=[]
  day_ids = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
  slot_ids = [
      "8:30 am - 10:00 am",
      "10:00 am - 11:30 am",
      "11:30 am - 1:00 pm",
      "1:00 pm - 2:30 pm",
      "2:30 pm - 4:00 pm",
      "4:00 pm - 5:30 pm",
      "5:30 pm - 7:00 pm",
      "5:30 pm - 8:30 pm"
  ]
  
 
  
  const [apiResponse, setApiResponse] = useState({
    courseTimeslotPreferenceClashes: {
      "1": [
        {
          "instructorId": 1,
          "NonPreferredtimeslot1": 2,
          "NonPreferredTimeslot2": 1,
          "AssignedTimeslotid": 1,
          "AssignedCourse": "CS3001"
        },
        {
          "instructorId": 1,
          "NonPreferredtimeslot1": 2,
          "NonPreferredTimeslot2": 1,
          "AssignedTimeslotid": 2,
          "AssignedCourse": "CS3"
        }
      ],
      "2": [
        {
          "instructorId": 2,
          "NonPreferredtimeslot1": 2,
          "NonPreferredTimeslot2": 1,
          "AssignedTimeslotid": 1,
          "AssignedCourse": "CS1"
        },
        {
          "instructorId": 2,
          "NonPreferredtimeslot1": 2,
          "NonPreferredTimeslot2": 1,
          "AssignedTimeslotid": 1,
          "AssignedCourse": "CS2"
        },
        {
          "instructorId": 2,
          "NonPreferredtimeslot1": 2,
          "NonPreferredTimeslot2": 1,
          "AssignedTimeslotid": 1,
          "AssignedCourse": "CS5"
        }
      ]
    },
    courseScheduleClashes: {
      "123456789_11": [
        {
          "timeSlotId": 11,
          "courseName":"CS202"
        },
        {
          "timeSlotId": 11,
          "courseName": "COAL(BCS-3A)"
        }
      ],
      "123456789_5": [
        {
          "timeSlotId": 5,
          "courseName": "Discrete(BCS-4B)"
        },
        {
          "timeSlotId": 5,
          "courseName": "POL(BCS-5D)"
        }
      ]
    },
    coursePreferenceClashes: {
      "1": [
        {
          "instructorId": 1,
          "PreferredCourse1": "CS3",
          "PreferredCourse2": "CS14",
          "AssignedCourse": "CS3001"
        }
      ],
      "2": [
        {
          "instructorId": 2,
          "PreferredCourse1": "CS1",
          "PreferredCourse2": "CS2",
          "AssignedCourse": "CS5"
        }
      ],
      "123456789": [
        {
          "instructorId": 123456789,
          "PreferredCourse1": "CS1",
          "PreferredCourse2": "CS5",
          "AssignedCourse": "CS202"
        },
        {
          "instructorId": 3,
          "PreferredCourse1": "CS1",
          "PreferredCourse2": "CS5",
          "AssignedCourse": "CS6"
        }
      ]
    }
  });
  const [data, setData] = useState([]);
  const [courseinstructors, setcourseinstructors] = useState([]);
  //const [labinstructors, setlabinstructors] = useState([]);
  const [courseTimeslotClashes, setCourseTimeslotClashes] = useState([]);
  const [scheduleClashes, setScheduleClashes] = useState([]);
  const [preferenceClashes, setPreferenceClashes] = useState([]);
  const [clash_, setclash] = useState(false); //bool if any clash then popup
  const [selectedcourseName,setselectedcoursename]=useState([])
  const [selectedtimeSlotId,setselectedtimeslotId]=useState([])



  useEffect(() => {
    fetch('http://localhost:4000/api/v1/data')
      .then(res => res.json())
      .then(data => setData(data));
  }, []);

  function checkClashes(instructorId, courseName, timeslotId) {
    // Check for course timeslot preference clashes
    let clashes = apiResponse.courseTimeslotPreferenceClashes[instructorId.toString()];
    console.log(clashes)
    if (clashes) {
       clashes = clashes.filter(
        (clash) =>
        
          clash.AssignedTimeslotid === timeslotId % 10 &&
          clash.AssignedCourse === courseName
      );
      console.log(clashes);
      console.log(clashes);

      if (clashes.length > 0) {
        setCourseTimeslotClashes(clashes);
        setclash(true);
        // console.log("Course timeslot preference clashes:");
        // console.log(clashes);
      }
    }
  
    // Check for course schedule clashes
    const scheduleKey = instructorId + "_" + timeslotId   ;
    let scheduleClashes = apiResponse.courseScheduleClashes[scheduleKey];
    console.log(scheduleKey);
    if (scheduleClashes) {
       scheduleClashes = scheduleClashes.filter(
        (clash) => clash.courseName === courseName
      );
      if (scheduleClashes.length > 0) {
        setScheduleClashes(scheduleClashes);
        setclash(true);
        // console.log("Availability clashes:");
        // console.log(scheduleClashes);
      }
    }
  
    // Check for course preference clashes

    let preferenceClashes = apiResponse.coursePreferenceClashes[instructorId.toString()];
    // console.log(preferenceClashes);
    if (preferenceClashes) {
       preferenceClashes = preferenceClashes.filter(
        (clash) =>
          (
          clash.AssignedCourse === courseName)
      );
      //console.log(preferenceClashes);
      if (preferenceClashes.length > 0) {
        setPreferenceClashes(preferenceClashes);
        setclash(true);
        // console.log("Course preference clashes:");
        // console.log(preferenceClashes);
      }
    }
  }
  
  
  // Example usage
  

  const showInstructorList = (courseName, timeslotId) => {
    fetch('http://localhost:4000/api/v1/course-instructors')
      .then((response) => response.json())
      .then((data) => setcourseinstructors(data))
      .catch((err) => console.error(err));

      setselectedcoursename(courseName);
      setselectedtimeslotId(timeslotId)
  };
  
  const handleSelectInstructor = async (inst, courseName, timeslotId) => {
    
    const instructorid = inst.personalid;
    //other two are already in variables 
    // inst has id and name islye instructorname

    try {
      const response = await Axios.put('http://localhost:4000/api/v1/allocate-instructor', {
        courseName: courseName,
        timeSlotId: timeslotId,
        instructorId: instructorid
      });
      setData(prevRows => {
        return prevRows.map(row => {
          if (row.courseName === courseName && row.timeSlotId===timeslotId ) {
            return { ...row, instructorId: instructorid };
          }
          return row;
        });
      });
      console.log(response.data); // Handle the response as needed
    } catch (error) {
      console.error(error);
      // Handle the error
    }
  

    checkClashes(inst.personalid, courseName, timeslotId);
  
    setcourseinstructors([]);
  };
  

  const InstructorListPopup = ({ instructors, courseName, timeslotId }) => {
    console.log(courseName);
    console.log(timeslotId);
    return (
      <div className="popup-overlay">
        <div className="popup-content">
          <h1>Available Instructors:</h1>
          <ul>
            {instructors.map((inst) => (
              <li key={inst._id}>
                {inst.name} ({inst.personalid})
                <button
                  onClick={() => handleSelectInstructor(inst, courseName, timeslotId)}
                >
                  Select
                </button>
              </li>
            ))}
          </ul>
          <button onClick={() => setcourseinstructors([])}>Close</button>
        </div>
      </div>
    );
  };
//scheduleclash popup

const ClashPopup = () => {

  return (
    
    <div className="popup-overlay">
       <div className="popup-content">
       <div >
       {courseTimeslotClashes.length > 0 && (
  <div>
     Timeslot preference clashes:
    {courseTimeslotClashes.map((clash, index) => (
      <div className="tpcpopup" key={index}>
       {clash.AssignedTimeslotid} is not the prefeered time slot of instructor !
      </div>
    ))}
  </div>
)}
{scheduleClashes.length > 0 && (
  <div>
    Availability clashes:
    {scheduleClashes.map((clash, index) => (
      <div className="availpopup" key={index}>
     instructor is already allocated at timeslot of instructor ! {clash.timeSlotId} !!
      </div>
    ))} 
    
    </div>
)}
{preferenceClashes.length > 0 && (
  <div>
    Course preference clashes:
    {preferenceClashes.map((clash, index) => (
      <div className="cpcpopup" key={index}>
        {clash.AssignedCourse} is not the preferred course
      </div>
    ))}
  </div>
)}
     <button onClick={() => {
  setclash(false);
  //empty clashes for future
  setPreferenceClashes([]);
  setCourseTimeslotClashes([]);
  setScheduleClashes([]);
}}>Close</button>

</div>
</div>
</div>
);
};



  return (
    <div className="w-screen h-screen flex flex-col items-center bg-gray-200">
    {clash_ && < ClashPopup/>}
    <h1 className="mainheading">
      Allocation of Instructors
    </h1>
    
    <table>
      <thead>
        <tr>
          <th>Course</th>
          <th>Day</th>
          <th>Time</th>
          <th>Timeslot</th>
          <th>Instructor</th>
        </tr>
      </thead>
      <tbody>
       {data.map(row => (
    <tr key={row._id}>
        <td>{row.courseName}</td>
        <td>{day_ids[Math.floor(row.timeSlotId / 10) - 1]}</td>
        <td>{slot_ids[row.timeSlotId % 10 - 1]}</td>
        <td>{row.timeSlotId}</td>
    <td>
  {row.instructorId ? (
    row.instructorId
  ) : (
    <>
      <button onClick={() => showInstructorList(row.courseName, row.timeSlotId)}>
  Allocate Instructor
</button>


    </>
  )}
</td>
          </tr>
        ))}
        
      {courseinstructors.length > 0 && (
        <InstructorListPopup
          instructors={courseinstructors}
          courseName={selectedcourseName}
          timeslotId={selectedtimeSlotId}
        />
      )}
      </tbody>
    </table>
 </div>
       
  );

}

export default CTimetable;
//////////////////////////////////////////////////////////////////////


