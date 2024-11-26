// Chat.js
import React, { useState } from 'react';
import './Chat.css';

const Chat = () => {
  const [messages, setMessages] = useState([
    { content: "I'm Pandy, the Panda Express AI Assistant! How can I help you today?", role: 'assistant' }
  ]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (input.trim() === '') return;
    const userMessage = { content: input, role: 'user' };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
  
    try {
      const response = await fetch('/api/getChatBotResponse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updatedMessages }),
      });
      const data = await response.json();
      setMessages(prev => [...prev, { content: data.response, role: 'assistant' }]);
    } catch (error) {
      console.error('Error fetching bot response:', error);
    }
  };

  return (
    <div className="chat">
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.role}`}>
            {msg.content}
          </div>
        ))}
      </div>
      <div className="input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;