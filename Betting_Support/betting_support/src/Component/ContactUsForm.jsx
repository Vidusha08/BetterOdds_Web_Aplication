import React, { useState } from 'react';
import './ContactUsPage.css';


export default function ContactUsForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    eventId: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Convert email to lowercase before submission
    const formDataToSubmit = {
      ...formData,
      email: formData.email.toLowerCase()
    };
    
    // Handle form submission
    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formDataToSubmit)
      });
      
      if (response.ok) {
        console.log('Form submitted successfully');
        setIsSubmitted(true);
        // Clear form fields after submission
        setFormData({
          name: '',
          email: '',
          eventId: '',
          message: ''
        });
      } else {
        console.error('Form submission failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }

    // Reset submission status after a few seconds
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const handleClear = () => {
    setFormData({
      name: '',
      email: '',
      eventId: '',
      message: ''
    });
  };

  return (
    <div className="contact-form">
      <h4>Send Message</h4>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Your Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Your Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="eventId">Event ID:</label>
          <input
            type="text"
            id="eventId"
            name="eventId"
            value={formData.eventId}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-buttons">
          <button type="submit" className="submit-button">
          {isSubmitted ? 'Successfully Sent' : 'Send Message'}
          </button>
          <button type="button" className="clear-button" onClick={handleClear}>Clear Message</button>
        </div>
      </form>
    </div>
  );
}

