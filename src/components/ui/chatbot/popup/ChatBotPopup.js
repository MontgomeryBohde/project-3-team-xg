"use client";

import React, { useState } from 'react';
import './ChatBotPopup.css';

import Chat from '@/components/ui/chatbot/chat/Chat';

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
  
    const toggleChatbot = () => {
      setIsOpen(!isOpen);
    };
  
    return (
      <div className="chatbot">
        <div className="chatbot-header" onClick={toggleChatbot}>
          Chat
          <span className={`arrow ${isOpen ? 'down' : 'up'}`}></span>
        </div>
        {isOpen && (
          <div className="chatbot-window">
            <Chat />
          </div>
        )}
      </div>
    );
  };
  
  export default ChatBot;