// DataEdit.jsx

import React, { useState } from 'react';
import './DataEdit.css';

const DataEdit = () => {
  const [courseName, setCourseName] = useState('');
  const [examDate, setExamDate] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can handle form submission logic here
    console.log('Course Name:', courseName);
    console.log('Exam Date:', examDate);
    console.log('Start Date:', startDate);
    console.log('End Date:', endDate);
  };

  return (
    <div className="data-edit-container">
      <form onSubmit={handleSubmit}>
        <label>
          Course Name:
          <select
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            required
          >
            <option value="">Select a course</option>
            <option value="CC in Web Designing & Tools">CC in Web Designing & Tools</option>
          </select>
        </label>

        <label>
          Exam Date:
          <input
            type="date"
            value={examDate}
            onChange={(e) => setExamDate(e.target.value)}
            required
          />
        </label>

        <label>
          Start Date:
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </label>

        <label>
          End Date:
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </label>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default DataEdit;
