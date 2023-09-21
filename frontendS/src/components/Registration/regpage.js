import React, { useState } from 'react';
import './regpage.css';
import axios from 'axios';

const RegPage = () => {
  const [userType, setUserType] = useState('institute');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [instituteName, setInstituteName] = useState('');
  const [courseName, setCourseName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [district, setDistrict] = useState('district1'); // Default to 'district1'
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  // Additional fields for the Institute form group
  const [courseCode, setCourseCode] = useState('course1'); // Default to 'course1'
  const [ownerName, setOwnerName] = useState('');
  const [instituteAddress, setInstituteAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [contactNumber, setContactNumber] = useState('');

  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };

  const handleInputChange = (event, stateSetter) => {
    stateSetter(event.target.value);
  };

  const handleSignup = async () => {
    try {
      if (password !== confirmPassword) {
        setMessage('Passwords do not match. Please try again.');
        return;
      }

      const userData = {
        name,
        email,
        password,
        instituteName,
        approvalStatus: 'Pending', // Initial status when registering
      };

      if (userType === 'institute') {
        userData.district = district;
        userData.courseCode = courseCode;
        userData.ownerName = ownerName;
        userData.instituteAddress = instituteAddress;
        userData.pincode = pincode;
        userData.contactNumber = contactNumber;

        // Make a POST request to the institute registration route
        const response = await axios.post('/api/institute/register', userData);

        if (response.status === 201) {
          setMessage('Registered successfully. Wait for admin verification.');
          // Reset the form or redirect to another page as needed
        } else {
          setMessage('Institute registration failed. Please try again.');
        }
      } else {
        userData.courseName = courseName;
        userData.startDate = startDate;

        // Make a POST request to the student registration route
        const response = await axios.post('/api/student/register', userData);

        if (response.status === 201) {
          setMessage('Student registered successfully');
          // Reset the form or redirect to another page as needed
        } else {
          setMessage('Student registration failed. Please try again.');
        }
      }
    } catch (error) {
      setMessage('An error occurred during registration.');
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-form">
        <h2>Sign Up</h2>
        <div className="user-type">
          <label>User Type:</label>
          <select value={userType} onChange={handleUserTypeChange}>
            <option value="institute">Institute</option>
            <option value="student">Student</option>
          </select>
        </div>
        {userType === 'institute' ? (
          <>
            <div className="form-group">
              <label>Institute Name:</label>
              <input
                type="text"
                placeholder="Enter institute name"
                value={instituteName}
                onChange={(e) => handleInputChange(e, setInstituteName)}
              />
            </div>
            <div className="form-group">
              <label>District:</label>
              <select
                value={district}
                onChange={(e) => handleInputChange(e, setDistrict)}
              >
                <option value="district1">District 1</option>
                {/* Add more district options as needed */}
              </select>
            </div>
            {/* Additional fields for the Institute form group */}
            <div className="form-group">
              <label>Course Code:</label>
              <select
                value={courseCode}
                onChange={(e) => handleInputChange(e, setCourseCode)}
              >
                <option value="course1">Course 1</option>
                {/* Add course code options */}
              </select>
            </div>
            <div className="form-group">
              <label>Owner Name:</label>
              <input
                type="text"
                placeholder="Enter owner name"
                value={ownerName}
                onChange={(e) => handleInputChange(e, setOwnerName)}
              />
            </div>
            <div className="form-group">
              <label>Institute Address:</label>
              <input
                type="text"
                placeholder="Enter institute address"
                value={instituteAddress}
                onChange={(e) => handleInputChange(e, setInstituteAddress)}
              />
            </div>
            <div className="form-group">
              <label>Pincode:</label>
              <input
                type="text"
                placeholder="Enter pincode"
                value={pincode}
                onChange={(e) => handleInputChange(e, setPincode)}
              />
            </div>
            <div className="form-group">
              <label>Contact Number:</label>
              <input
                type="text"
                placeholder="Enter contact number"
                value={contactNumber}
                onChange={(e) => handleInputChange(e, setContactNumber)}
              />
            </div>
          </>
        ) : (
          <>
            <div className="form-group">
              <label>Student Name:</label>
              {/* ... (existing Student fields) */}
            </div>
            <div className="form-group">
              <label>Course Name:</label>
              <input
                type="text"
                placeholder="Enter course name"
                value={courseName}
                onChange={(e) => handleInputChange(e, setCourseName)}
              />
            </div>
            <div className="form-group">
              <label>Start Date:</label>
              <input
                type="date"
                placeholder="Select start date"
                value={startDate}
                onChange={(e) => handleInputChange(e, setStartDate)}
              />
            </div>
          </>
        )}
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => handleInputChange(e, setEmail)}
          />
        </div>
        <div className="form-group">
          <label>New Password:</label>
          <input
            type="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => handleInputChange(e, setPassword)}
          />
        </div>
        <div className="form-group">
          <label>Confirm Password:</label>
          <input
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => handleInputChange(e, setConfirmPassword)}
          />
        </div>
        <button className="signup-button" onClick={handleSignup}>
          Sign Up
        </button>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default RegPage;











