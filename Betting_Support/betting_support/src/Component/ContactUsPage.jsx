import React from 'react';
import { Link } from 'react-router-dom'; 
import ContactUsForm from './ContactUsForm';
import './ContactUsPage.css';

// Import images
import phoneIcon from './Images/phone-icon.png';
import whatsappIcon from './Images/whatsapp-icon.png';
import emailIcon from './Images/email-icon.png';
import facebookIcon from './Images/facebook-icon.png';

export default function ContactUsPage() {

  return (

    <div>
      {/* Header */}
      <header className="horizontal-bar">
      <div className="col align-items-center">
        <div className="Topic" >
          <h1>How Can We Help?</h1>
        </div>
        <div className="col-md-5 ">
          <input type="text" className="form-control" placeholder="Search..." />
        </div>
        </div>
      </header>
      
      {/* Contact information section */}
      <div className="container">  
        <div className="contactSection__header">
          <div className="subTopic">
            <h2>Contact Informations</h2>
          </div>
          {/* Add the button to the right side */}
          <div className="chatbot-button-container">
          <div>
                <Link to="/chat-bot">
                  <button className="chatbot-button">Chat with Us</button>
                </Link>
              </div>
          </div>
        </div>

        <div className="contactSection__wrapper">
          
          <div className="left">
            
            {/* Phone */}
            <div className="contact-item">
              <img src={phoneIcon} alt="Phone" className="contact-icon" />
              <ul>
                <li className="info"><h5>Phone:</h5></li>
                <li className="info">+123-456-7890</li>
              </ul>
            </div>
             {/* WhatsApp */}
            <div className="contact-item">
              <img src={whatsappIcon} alt="WhatsApp" className="contact-icon" />
              <ul>
                <li className="info"><h5>WhatsApp:</h5></li>
                <li className="info">+123-456-7890</li>
              </ul>
            </div>
            {/* Email */}
            <div className="contact-item">
              <img src={emailIcon} alt="Email" className="contact-icon" />
              <ul>
                <li className="info"><h5>Email:</h5></li>
                <li className="info">contact@example.com</li>
              </ul>  
            </div>
            {/* Facebook */}
            <div className="contact-item">
              <img src={facebookIcon} alt="Facebook" className="contact-icon" />
              <ul>
                <li className="info"><h5>Facebook:</h5></li>
                <li className="info">fb.com/yourprofile</li>
              </ul>    
            </div>
          
          </div>

          {/* Vertical line */}
          <div className="vertical-line"></div>

          {/* Contact form */}
          <div className="right ">
              <ContactUsForm />
          </div>

        </div>
      </div>
    </div>
 
  );
}
