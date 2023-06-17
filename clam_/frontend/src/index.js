import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './clam.css';
import reportWebVitals from './reportWebVitals';
// import App from './App';
// import Clam from './clam.js';
//import Timetable from './clamcourses.js';
// import React, { useState } from 'react';
import Axios from 'axios';
import { useState,  useEffect } from 'react';
import Timetable from './clamcourses'; 
import Labtimetable from './clamlabs'
import CTimetable from './clam';
//to show clashes
//import CTimetable from './clam'; 


function AllocationForm() {
  const [allocationType, setAllocationType] = useState('');

  const handleAllocationTypeChange = (event) => {
    setAllocationType(event.target.value);
  };

  const renderAllocationContent = () => {
    if (allocationType === 'courses') {
        //return <Timetable />;
        return<CTimetable />
    } else if (allocationType === 'labs') {
      return <Labtimetable />;
    }

    return null;
  };

  return (
    <div>
      <div className='iniAI'>
      <h2 classname='option_hallocateinstructor'>Allocate Instructors</h2>
      </div>
      <label className='selecttype'>
        Select Allocation Type:
        <select value={allocationType} onChange={handleAllocationTypeChange}>
          <option value="">Select</option>
          <option value="courses">Courses</option>
          <option value="labs">Labs</option>
        </select>
      </label>
      {renderAllocationContent()}
     
    </div>
  );
}

export default AllocationForm;







const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AllocationForm />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
