import React, { useState, useEffect } from 'react';
import { getNotifications } from './NotificationService';
import './NotificationsPage.css'; // Import the CSS file for styling

function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newNotifications = getNotifications();
      setNotifications(newNotifications);
    }, 1000); // Check for new notifications every second

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="notifications-container">
      <h2>Notifications</h2>
      <ul className="notifications-list">
        {notifications.map((notification, index) => (
          <li key={index} className="notification-box">
            <div className="notification-message">{notification.message}</div>
            <div className="notification-time">Received at: {new Date().toLocaleTimeString()}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NotificationsPage;

