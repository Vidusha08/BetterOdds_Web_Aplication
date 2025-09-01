import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './ChatbotPage.css'; 

const socket = io.connect('http://localhost:5000');

export default function ChatbotPage() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  // Listening for new messages
  useEffect(() => {
    socket.on('receiveMessage', (message) => {
      console.log('Message received from server:', message);
      setMessages((prevMessages) => [...prevMessages, message]);
    });
    
    return () => {
      socket.off('receiveMessage');
    };
  }, []);

  // Sending message to the server
  const sendMessage = (message) => {
    socket.emit('sendMessage', message);
  };

  // Handle message submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      const userMessage = { user: 'User', message };
      sendMessage(userMessage); // Send user message to server
      setMessage(''); // Clear the input field 
    }
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
        </div>
      </header>

      {/* Contact information section */}
      <div className="container">  
        <div className="subTopic">
          <h2>Chat with Us</h2>
        </div>

        <div className="chatbot-container">
      
          <div className="chat-box">
          <div className="messages">
              {messages.map((msg, idx) => (
                <div key={idx} className={`chat-message ${msg.user === 'User' ? 'user-message' : 'bot-message'}`}>
                  <strong>{msg.user}: </strong>{msg.message}
                </div>
              ))}
            </div>
            <form onSubmit={handleSubmit} className="message-form">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="message-input"
              />
              <button type="submit" className="send-button">Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
