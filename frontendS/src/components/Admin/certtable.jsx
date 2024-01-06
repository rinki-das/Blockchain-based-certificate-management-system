// CertTable.jsx

import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import './certtable.css'; // Import the CSS file

function CertTable() {
  const [courseName, setCourseName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [data, setData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedCertificateData, setEditedCertificateData] = useState({
    studentId: '',
    certificateNumber: '',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`/fetch-data?courseName=${courseName}&startDate=${startDate}&endDate=${endDate}`);
      if (response.ok) {
        const fetchedData = await response.json();
        setData(fetchedData);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to fetch data');
    }
  };

  const handleEditCertificate = (studentId) => {
    setIsEditing(studentId);
  };

  const handleGenerateReport = () => {
    // You can add logic here to generate the report
    // For example, you can fetch additional data or perform other actions
    // Update the logic based on your specific requirements
    console.log('Generating Report...');
  };


  const handleSaveCertificate = (studentId) => {
    const { certificateNumber } = editedCertificateData;

    fetch('/update-certificate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        courseName,
        studentId,
        certificateNumber,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        toast.success(result.message);
        setIsEditing(false);
        setEditedCertificateData({});
        fetchData(); // Fetch updated data
      })
      .catch((error) => {
        console.error('Error updating certificate:', error);
        toast.error('Failed to update certificate');
      });
  };

  return (
    <div className="cert-table-container">
      <h6>Certificate Table</h6>
      <div className="cert-form-container">
        <label>Course Name:</label>
        <input type="text" value={courseName} onChange={(e) => setCourseName(e.target.value)} />
        <label>Start Date:</label>
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        <label>End Date:</label>
        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        <button onClick={fetchData}>Fetch Data</button>
      </div>

      <table className="cert-table">
        <thead>
          <tr>
            <th>Course Name</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Student Name</th>
            <th>Student ID</th>
            <th>Theory Marks</th>
            <th>Project Marks</th>
            <th>Percentage Marks</th>
            <th>Grade</th>
            <th>Total Marks</th>
            <th>Certificate Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.studentId}>
              <td>{row.courseName}</td>
              <td>{row.startDate}</td>
              <td>{row.endDate}</td>
              <td>{row.studentName}</td>
              <td>{row.studentId}</td>
              <td>{row.theoryMarks}</td>
              <td>{row.projectMarks}</td>
              <td>{row.percentageMarks}</td>
              <td>{row.grade}</td>
              <td>{row.totalMarks}</td>
              <td>
                {isEditing === row.studentId ? (
                  <input
                    type="text"
                    value={editedCertificateData.certificateNumber || row.certificateNumber}
                    onChange={(e) =>
                      setEditedCertificateData({ ...editedCertificateData, certificateNumber: e.target.value })
                    }
                  />
                ) : (
                  row.certificateNumber
                )}
              </td>
              <td>
                {isEditing === row.studentId ? (
                  <button onClick={() => handleSaveCertificate(row.studentId)}>Save Certificate</button>
                ) : (
                  <button onClick={() => handleEditCertificate(row.studentId)}>Edit Certificate</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {data.length > 0 && (
        <button onClick={handleGenerateReport}>Generate Report</button>
      )}
    </div>
  );
}

export default CertTable;


















