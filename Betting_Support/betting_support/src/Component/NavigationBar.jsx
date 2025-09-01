import React from 'react';
import { Link } from 'react-router-dom';
import './NavigationBar.css'; 
export default function NavigationBar() {
  return (
    <div className="navbar-container">
      <ul style={{ listStyleType: 'none', padding: 40,color:'#f0f0f0' }}>
        
        <li>
          <Link to="/" className="navbar-link">Help & Support</Link>
        </li>
        <li>
          <Link to="/contact-us" className="navbar-link" >Contact Us</Link>
        </li>
        <li>
          <Link to="/notification" className="navbar-link" >Notifications</Link>
        </li>
      </ul>
    </div>
  );
}