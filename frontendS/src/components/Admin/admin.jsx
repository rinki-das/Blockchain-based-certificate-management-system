import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './admin.css'; // Import the CSS for admin dashboard styling

function Admin() {
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const handleLogoutConfirmation = (confirmed) => {
    if (confirmed) {
      // User confirmed logout, perform the logout action.
      // You should replace the following line with your actual logout logic.
      window.location.href = '/logins'; 
    } else {
      // User canceled the logout.
      setShowLogoutModal(false);
    }
  };

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <div className="sidebar">
        <ul>
          <li><Link to="/">Dashboard</Link></li>
          <li><Link to="/data-entry">Data Import</Link></li>
          <li><Link to="/DataEdit">Data Edit</Link></li>
          <li><Link to="/">Data Forward</Link></li>
          <li><Link to="/batchcreation">Bactch Creation</Link></li>
          <li><Link to="/status">Student Status</Link></li>
         
          
          {/* Add a "Logout" option within the sidebar */}
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      </div>

      {/* Dashboard content */}
      <div className="dashboard-content">
        <h1>Welcome to the Admin Dashboard</h1>
        <p>This is the main dashboard content area.</p>
      </div>

      {/* Logout confirmation modal */}
      {showLogoutModal && (
        <div className="logout-modal">
          <div className="modal-content">
            <span className="close" onClick={() => handleLogoutConfirmation(false)}>
              &times; {/* Close (cross) icon */}
            </span>
            <p>Are you sure you want to log out?</p>
            <button onClick={() => handleLogoutConfirmation(true)}>Yes</button>
            <button onClick={() => handleLogoutConfirmation(false)}>No</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Admin;



