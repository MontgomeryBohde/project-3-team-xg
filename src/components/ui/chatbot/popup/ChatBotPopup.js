"use client";

/**
 * @file ChatBotPopup.js
 * @description This file contains the ChatBot component which renders a chatbot popup window.
 * @requires React
 * @requires useState
 * @requires ./ChatBotPopup.css
 * @requires @/components/ui/chatbot/chat/Chat
 */

import React, { useState } from 'react';
import './ChatBotPopup.css';

import Chat from '@/components/ui/chatbot/chat/Chat';

/**
 * ChatBot component renders a chatbot popup window.
 * @component
 * @returns {JSX.Element} The rendered ChatBot component.
 */
const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
  
    /**
     * Toggles the chatbot window open and closed.
     */
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