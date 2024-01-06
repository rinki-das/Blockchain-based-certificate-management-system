import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './admin.css'; // Import the CSS for certificate department dashboard styling
import './CertDept.css'
function CertDept() {
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
          <li><Link to="/notify">Notifications</Link></li>
          <li><Link to="/certtable">Add Certificate</Link></li>
          <li><Link to="/certinum">Issue Certificate</Link></li>
         

          
          {/* Add a "Logout" option within the sidebar */}
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      </div>

      {/* Dashboard content */}
      <div className="dashboard-content">
        <h1>Welcome to your Dashboard Admin</h1>
        <p>This is the main dashboard content area for the Certificate Department.</p>
      </div>

      {/* Logout confirmation modal */}
      {showLogoutModal && (
        <div className="logout-modal">
          <div className="modal-content">
            <span className="close" onClick={() => handleLogoutConfirmation(false)}>
              &times; {/* Close (cross) icon */}
            </span>
            <p>Are you sure you want to log out?</p>
            <button1 onClick={() => handleLogoutConfirmation(true)}>Yes</button1>
            <button1 onClick={() => handleLogoutConfirmation(false)}>No</button1>
          </div>
        </div>
      )}
    </div>
  );
}

export default CertDept;
