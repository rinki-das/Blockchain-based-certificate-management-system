// NotificationService.js

// A simple array to store notifications
const notifications = [];

// Function to send a notification
export function sendNotification(notification) {
  notifications.push(notification);
}

// Function to get all notifications
export function getNotifications() {
  return notifications;
}
