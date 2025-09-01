import React, { useState, useEffect } from 'react';
import './UserManual.css';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa'; // Import triangle icons

export default function UserManual() {
    const [activeIndex, setActiveIndex] = useState(null); // Track active FAQ index
    const [language, setLanguage] = useState('en'); // Selected language ('en' or 'si')
    const [section, setSection] = useState('general'); // Selected section ('general', 'betting', or 'account')
    const [guidelines, setGuidelines] = useState([]);


    useEffect(() => {
        fetchGuidelines();
    }, [language, section]);

    const fetchGuidelines = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/usermanual?language=${language}&category=${section}`);
            const data = await response.json();
            setGuidelines(data);
        } catch (error) {
            console.error('Error fetching guidelines:', error);
        }
    };

    const toggleAnswer = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const switchLanguage = (lang) => {
        setLanguage(lang);
        setActiveIndex(null);
    };

    const switchSection = (section) => {
        setSection(section);
        setActiveIndex(null);
    };
    

    return (
        <div> 
            {/* Header */}
            <header className="horizontal-bar">
                <div className="col align-items-center">
                    <div className="Topic">
                        <h1>How Can We Help?</h1>
                    </div>
                    <div className="col-md-5">
                        <input type="text" className="form-control" placeholder="Search..." />
                    </div>
                    {/* Language buttons */}
                    <div className="language-buttons">
                        <button
                            className={`language-button ${language === 'en' ? 'selected' : ''}`}
                            onClick={() => switchLanguage('en')}
                        >
                            English
                        </button>
                        <button
                            className={`language-button ${language === 'si' ? 'selected' : ''}`}
                            onClick={() => switchLanguage('si')}
                        >
                            සිංහල
                        </button>
                    </div>
                </div>
            </header>
            
            {/* User manual content */}
            <div className="container align-items-center"> 
              <div className="box"> 
                <div className="subTopic">
                    <h2>{language === 'en' ? 'User Manual' : 'පරිශීලක අත්පොත'}</h2>
                </div>
                {/* Section cards */}
                <div className="section-cards">
                    <div
                        className={`section-card ${section === 'general' ? 'selected' : ''}`}
                        onClick={() => switchSection('general')}
                    >
                        {language === 'en' ? 'General' : 'සාමාන්‍ය'}
                    </div>
                    <div
                        className={`section-card ${section === 'betting' ? 'selected' : ''}`}
                        onClick={() => switchSection('betting')}
                    >
                        {language === 'en' ? 'Betting' : 'පාරිභෝගික'}
                    </div>
                    <div
                        className={`section-card ${section === 'account' ? 'selected' : ''}`}
                        onClick={() => switchSection('account')}
                    >
                        {language === 'en' ? 'Account' : 'ගිණුම'}
                    </div>
                </div>
                <div className="UserManual__wrapper">
                    
                        <div className="faq-section">
                            <ul>
                                {guidelines.map((faq, index) => (
                                    <li key={faq.id} className="faq-item">
                                        <div className="faq-question" onClick={() => toggleAnswer(index)}>   
                                            {activeIndex === index ? <FaAngleUp /> : <FaAngleDown />}
                                            <h5>{faq.question}</h5> 
                                        </div>
                                        {activeIndex === index && (
                                            <div className="faq-answer">
                                                <p>{faq.answer}</p>
                                                {faq.image && <img src={faq.image} alt={faq.question} className="faq-image" />}
                                                {faq.video && (
                                                    <video controls className="faq-video">
                                                        <source src={faq.video} type="video/mp4" />
                                                        Your browser does not support the video tag.
                                                    </video>
                                                )}
                                            </div>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}