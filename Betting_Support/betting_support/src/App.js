import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HelpSupportPage from './Component/HelpSupportPage';
import ContactUsPage from './Component/ContactUsPage';
import NotificationPage from './Component/NotificationPage';
import NavigationBar from './Component/NavigationBar';
import ContactUsForm from  './Component/ContactUsForm';
import UserManual from  './Component/UserManual';
import ChatbotPage from  './Component/ChatbotPage';


export default function App() {
  return (
    <Router>
      <div style={{ display:"flex" }}> {/* Use flexbox layout */}
        <NavigationBar />

        <Routes>
          <Route path="/" element={<HelpSupportPage/>} /> {/* Use exact root path */}
            <Route path="/contact-us" element={<ContactUsPage/>} />
            <Route path="/contact-form" element={<ContactUsForm/>} />
            <Route path="/user-manual" element={<UserManual/>} />
            <Route path="/chat-bot" element={<ChatbotPage/>} />
            <Route path="/notification" element={<NotificationPage/>} />
        </Routes> 
      </div>
      
    </Router>
  );
}


