// SignIn.js
import React, { useState } from 'react';
import axios from 'axios';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSignIn = async () => {
    try {
      // Check if the institute's registration is approved
      const response = await axios.get(`/api/institute/checkApproval?email=${email}`);
      
      if (response.data.isApproved) {
        // Allow the institute to sign in
        setMessage('Sign in successful');
        // Redirect to the dashboard or wherever you want
      } else {
        // Institute registration is not approved
        setMessage('Institute registration is pending or rejected. Contact the admin for approval.');
      }
    } catch (error) {
      setMessage('An error occurred during sign-in.');
    }
  };

  return (
    <div className="signin-page">
      <div className="signin-form">
        <h2>Sign In</h2>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="signin-button" onClick={handleSignIn}>
          Sign In
        </button>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default SignIn;

