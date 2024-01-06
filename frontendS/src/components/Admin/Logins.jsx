import React, { useState } from 'react';
import './Logins.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

const Logins = () => {
  const [password, setPassword] = useState('');
  const [selectedUser, setSelectedUser] = useState('department'); // Default to 'department'
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate(); // Initialize the navigate function

  const handleLogin = () => {
    if (
      (selectedUser === 'department' && password === 'department') ||
      (selectedUser === 'certificate' && password === 'certificate')
    ) {
      // Password and user type are correct, navigate to the respective dashboard.
      setErrorMessage('');
      if (selectedUser === 'department') {
        navigate('/admin'); // Navigate to the User Department dashboard
      } else if (selectedUser === 'certificate') {
        navigate('/certdept'); // Navigate to the Certificate Department dashboard
      }
    } else {
      // Display an error message for an invalid password.
      setErrorMessage('Invalid password');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <select
        value={selectedUser}
        onChange={(e) => setSelectedUser(e.target.value)}
      >
        <option value="department">User Department</option>
        <option value="certificate">Certificate Department</option>
      </select>
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Logins;


















