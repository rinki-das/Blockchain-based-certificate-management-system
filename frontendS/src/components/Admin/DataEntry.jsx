import React, { useState } from 'react';
import DataEntryReport from './DataEntryReport';
import * as XLSX from 'xlsx';
import './DataEntry.css';
import { toast } from 'react-toastify';

function DataEntry() {
  const [courseName, setCourseName] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [batchCode, setBatchCode] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [examDate, setExamDate] = useState('');
  const [excelFile, setExcelFile] = useState(null);
  const [excelData, setExcelData] = useState([]);
  const [isPrintMode, setIsPrintMode] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setExcelFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const parsedData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

        if (parsedData.length > 1) {
          const extractedData = parsedData.slice(1).map((row, index) => {
            const courseName = row[1];
            const startDate = row[2];
            const endDate = row[3];
            const examDate = row[4]; // Assuming the exam date is in the 5th column

            // Calculate the total marks and other calculations...
            const totalMarks = parseInt(row[6]) + parseInt(row[7]);
            const percentageMarks = (totalMarks / 50) * 100;
            let grade = '';
            if (percentageMarks >= 90) {
              grade = 'A+';
            } else if (percentageMarks >= 80) {
              grade = 'A';
            } else if (percentageMarks >= 70) {
              grade = 'B+';
            } else if (percentageMarks >= 60) {
              grade = 'B';
            } else if (percentageMarks >= 50) {
              grade = 'C+';
            } else if (percentageMarks >= 40) {
              grade = 'C';
            } else {
              grade = 'Absent';
            }

            // Store all students in the report
            const studentData = {
              slNo: index + 1,
              courseName,
              startDate,
              endDate,
              examDate: row[12],
              studentName: row[5],
              studentId: row[4],
              theoryMarks: row[6],
              projectMarks: row[7],
              totalMarks,
              grade,
              percentageMarks,
            };

            // Send data to the server (including 'Absent' students)
            sendDataToServer(studentData);

            return studentData;
          });

          setExamDate(extractedData[0].examDate); // Assuming the exam date is the same for all students
          setExcelData(extractedData);
        }
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const sendDataToServer = (studentData) => {
    const isAbsent = studentData.projectMarks === 'Absent';

    fetch('/upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...studentData,
        startDate: startDate,
        batchCode: batchCode, // Add the startDate to the studentData object
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Server Response:', data);

        // If the student is absent, also send data to the 'courseNameAbsent' collection
        if (isAbsent) {
          sendAbsentDataToServer(studentData);
        }
      })
      .catch((error) => {
        console.error('Error sending data to server:', error);
      });
  };

  const sendAbsentDataToServer = (absentStudentData) => {
    fetch('/upload-absent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(absentStudentData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Absent Data Saved:', data);
      })
      .catch((error) => {
        console.error('Error saving absent data:', error);
      });
  };

  const handleSubmit = () => {
    setSubmitting(true);
    setSuccessMessage('');

    // Simulate a successful submission (replace with actual API call)
    setTimeout(() => {
      setSubmitting(false);
      setSuccessMessage('Data saved successfully');
      toast.success('Data saved successfully', {
        icon: '🟢', // Green icon
      });
    }, 2000); // Simulating a delay
  };

  const handleGenerateReport = () => {
    setIsPrintMode(true);
  };

  // Include 'Absent' students in the generated PDF report
  const generateReportData = excelData;

  return (
    <div className="data-entry">
      <h1>Data Entry Page</h1>
      {!isPrintMode ? (
        <form>
          <label>
            Course Name:
            <select value={courseName} onChange={(e) => setCourseName(e.target.value)}>
              {/* Add options as needed */}
            </select>
          </label>
          <label>
            Course Code:
            <input type="text" value={courseCode} onChange={(e) => setCourseCode(e.target.value)} />
          </label>
          <label>
            Batch Code:
            <input type="text" value={batchCode} onChange={(e) => setBatchCode(e.target.value)} />
          </label>
          <label>
            Start Date:
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          </label>
          <label>
            End Date:
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
          </label>
          <label>
            Exam Date:
            <input type="date" value={examDate} onChange={(e) => setExamDate(e.target.value)} />
          </label>
          <label>
            Import Excel File:
            <input type="file" accept=".xls,.xlsx" onChange={handleFileChange} />
          </label>
          <button type="button" onClick={handleSubmit} disabled={submitting}>
            {submitting ? 'Submitting...' : 'Submit'}
          </button>
          <p>{successMessage}</p>
          <button type="button" onClick={handleGenerateReport}>
            Generate Report
          </button>
        </form>
      ) : (
        <DataEntryReport
          courseName={courseName}
          courseCode={courseCode}
          batchCode={batchCode}
          startDate={startDate}
          endDate={endDate}
          examDate={examDate}
          excelData={generateReportData}
        />
      )}
    </div>
  );
}

export default DataEntry;
