import React, { useState, useEffect } from 'react';
import './NotificationPage.css'; // Import your CSS file
//-import { notifications } from './data'; // Import notifications array from data file
import { Bell, Gift, Shield } from 'react-bootstrap-icons'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';


export default function Notification() {
  // State to track the selected notification category
  const [notificationCategory, setNotificationCategory] = useState('All');
  const [notifications, setNotifications] = useState([]);

  // Fetch notifications from backend when component mounts
  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/notifications');
      const data = await response.json();
      setNotifications(data);
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
    }
  };

  const filterNotifications = (category) => {
    setNotificationCategory(category);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/notifications/${id}`, {
        method: 'DELETE',
      });
      setNotifications(notifications.filter(notification => notification.id !== id));
    } catch (error) {
      console.error('Failed to delete notification:', error);
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    if (notificationCategory === 'All') {
      return true;
    } else if (notificationCategory === 'New') {
      return notification.new === true;
    } else if (notificationCategory === 'Unread') {
      return notification.unread === true;
    }
    return true;
  });

  const getIconComponent = (iconName) => {
    switch (iconName) {
      case 'bell':
        return <Bell className="Icon" />;
      case 'gift':
        return <Gift className="Icon" />;
      case 'shield':
        return <Shield className="Icon" />;
      default:
        return <Bell className="Icon" />;
    }
  };

  return (
    <div>
      
      <header className="notification-bar">
        <h1>Notifications</h1>
      <div className="notification_status">
        <p >You've 3 unread notifications.</p>
        
        <button className="mark-read-button">Mark all as read</button>
      
        </div>
      </header>
      
       {/* Notification container */}
      <div className="notification-container">
        <div className="notification-header">
          <div>
            {/* Buttons to filter notifications */}
            <button className="nav-button" onClick={() => filterNotifications('All')}>All</button>
            <button className="nav-button" onClick={() => filterNotifications('New')}>New</button>
            <button className="nav-button" onClick={() => filterNotifications('Unread')}>Unread</button>
          </div>
        
        </div>
        {/* Table to display notifications */}
        <table className="notification-table">
          <tbody>
            {filteredNotifications.map(notification => (
              <tr key={notification.id} className="table-row">
                <td>
                  <div className="icon-background">
                    {getIconComponent(notification.icon)}
                  </div>
                </td>
                <td>{notification.id}</td>
                <td>{notification.message}</td>
                <td>{notification.date}</td>
                <td>
                  <FontAwesomeIcon icon={faTrash} onClick={() => handleDelete(notification.id)} className="Trash" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}