import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './HelpSupportPage.css'; 
import { FaAngleDown, FaAngleUp } from 'react-icons/fa'; // Import triangle icons

export default function HelpSupportPage() {
  const [faqs, setFaqs] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null); // Track active FAQ index

  // Fetch FAQs from the backend
  useEffect(() => {
    fetchFAQs();
  }, []);

  const fetchFAQs = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/faqs');
      const data = await response.json();
      setFaqs(data);
    } catch (error) {
      console.error('Failed to fetch FAQs:', error);
    }
  };

  const toggleAnswer = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div >
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
      
      {/* Frequently Asked Questions section */}
      <div className="container">
        <div className="subTopic">
        <h2>Frequently Asked Questions</h2>
        </div>
        <div className="row ">
          <div className="col-md-7 ">
            <div className="faq-section">
    
              <ul>
                {faqs.map((faq,index) => (
                  <li key={faq.id} className="faq-item">
                    <div className="faq-question" onClick={() => toggleAnswer(index)}>   
                    {activeIndex === index ? <FaAngleUp /> : <FaAngleDown />}
                    <h5>{faq.question}</h5> 
                    </div>
                    {activeIndex === index && (
                    <div className="faq-answer">
                    <p>{faq.answer}</p>
                    {faq.image && <img src={faq.image} alt={faq.question} className="faq-image" />}
                    </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="col-md-3 ">

           {/* View User Manual button */}
          <div className="user-manual-button">
                <div><Link to="/user-manual"> 
                  <button>View User Manual</button>    
                </Link>
                </div>
            </div>
            {/* Contact Us button */}
            <div className="contact-us-button">
              <h4>Need Support?</h4>
              <p>Can’t find the answer you are looking for? Don’t worry we’re here to help.</p>
                <div><Link to="/contact-us"> 
                  <button>Contact Us</button>    
                </Link>
                </div>
            </div>
            
          </div>
        </div>
      </div>
      </div>
  );
}