// Admindashboard.js
import React, { useState } from 'react';
import './admindashboard.css';
import ManageInstitutes from './ManageInstitutes'; // Import the ManageInstitutes component
import ManageCertificates from './ManageCertificates'; // Import the ManageCertificates component

const Admindashboard = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState('Dashboard');
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const handleMenuItemClick = (menuItem) => {
    setSelectedMenuItem(menuItem);
  };

  const handleLogout = () => {
    setShowLogoutDialog(true);
  };

  const handleConfirmLogout = () => {
    // Implement your logout logic here
    // For example, clear user authentication tokens and redirect to the login page

    // After successful logout, close the confirmation dialog
    setShowLogoutDialog(false);

    // You can use localStorage, cookies, or a state management library like Redux for token handling.

    // For this example, we'll simulate a logout by resetting the page.
    window.location.reload();
  };

  const handleCancelLogout = () => {
    // Close the confirmation dialog if the user cancels the logout
    setShowLogoutDialog(false);
  };

  return (
    <div className="admin-dashboard">
      <div className="sidebar">
        {/* Sidebar content */}
        <ul className="sidebar-menu">
          <li>
            <a href="#" onClick={() => handleMenuItemClick('Dashboard')}>
              Dashboard
            </a>
          </li>
          <li>
            <a href="#" onClick={() => handleMenuItemClick('Users')}>
              Users
            </a>
          </li>
          <li>
            <a href="#" onClick={() => handleMenuItemClick('Institute')}>
              Manage Institutes
            </a>
          </li>
          <li>
            <a href="#" onClick={() => handleMenuItemClick('Certificates')}>
              Manage Certificates
            </a>
          </li>
          <li>
            <a href="#" onClick={handleLogout}>
              Logout
            </a>
          </li>
        </ul>
      </div>
      <div className="admin-main-content">
        {/* Display content based on the selectedMenuItem */}
        {selectedMenuItem === 'Dashboard' && (
          <h2>Dashboard Content Goes Here</h2>
        )}
        {selectedMenuItem === 'Users' && <h2>Users Content Goes Here</h2>}
        {selectedMenuItem === 'Institute' && <ManageInstitutes />}
        {selectedMenuItem === 'Certificates' && <ManageCertificates />} {/* Use the ManageCertificates component here */}
      </div>

      {/* Logout Confirmation Dialog */}
      {showLogoutDialog && (
        <div className="logout-dialog">
          <p>Are you sure you want to logout?</p>
          <button onClick={handleConfirmLogout}>Yes</button>
          <button onClick={handleCancelLogout}>No</button>
        </div>
      )}
    </div>
  );
};

export default Admindashboard;









