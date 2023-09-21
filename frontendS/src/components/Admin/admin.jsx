import React, { useState } from 'react';
import './admin.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from React Router

const Admin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // Initialize the navigate function

  // Define the pre-set admin credentials
  const adminCredentials = [
    { username: 'admin1', password: 'Nielit@1' },
    { username: 'admin2', password: 'Nielit@12' },
    { username: 'admin3', password: 'Nielit@123' },
    { username: 'admin4', password: 'Nielit@1234' },
  ];

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = () => {
    // Check if the entered username and password match any of the predefined admin credentials
    const matchedAdmin = adminCredentials.find(
      (admin) => admin.username === username && admin.password === password
    );

    if (matchedAdmin) {
      // Successful login
      console.log('Login Successful');
      // Redirect the user to the admin dashboard
      navigate('/admindashboard');
    } else {
      // Failed login
      setErrorMessage('Invalid username or password. Please try again.');
    }
  };

  return (
    <div className="admin-login">
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="login-box">
              <h2>Welcome Back Admin!</h2>
              <form>
                <div className="form-group">
                  <label>Username</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter username"
                    value={username}
                    onChange={handleUsernameChange}
                  />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter password"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                </div>
                <button
                  type="button"
                  className="btn btn-primary btn-block"
                  onClick={handleLogin}
                >
                  Login
                </button>
                {errorMessage && (
                  <p className="error-message">{errorMessage}</p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;

