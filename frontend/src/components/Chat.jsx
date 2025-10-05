// Importing required React hooks and components
import React, { useState, useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage'; // Custom component to render chat messages
import { PaperAirplaneIcon } from '@heroicons/react/24/solid'; // Icon for send button

// Main Chat component
const Chat = () => {
  // ---------------- STATE VARIABLES ----------------
  const [messages, setMessages] = useState([]);  // Stores all chat messages
  const [input, setInput] = useState('');        // User's current input text
  const [isLoading, setIsLoading] = useState(false); // Whether the AI is processing a message

  // ---------------- REFS ----------------
  const messagesEndRef = useRef(null); // Used to auto-scroll to bottom when new message arrives
  const inputRef = useRef(null);       // Used to focus input field automatically

  // ---------------- FUNCTIONS ----------------
  // Scrolls chat view to the bottom smoothly
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Auto-scrolls and focuses input whenever messages update
  useEffect(() => {
    scrollToBottom();
    inputRef.current?.focus();
  }, [messages]);

  // Handles sending of a user message
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    if (!input.trim()) return; // Ignore empty input

    const userMessage = input.trim();
    setInput(''); // Clear input field
    // Add user message to chat
    setMessages(prev => [...prev, { text: userMessage, isAi: false }]);
    setIsLoading(true); // Show loading indicator while waiting for AI

    try {
      // Send the message to backend API
      const response = await fetch('http://localhost:3000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // The message body being sent to your backend server
        body: JSON.stringify({ message: userMessage }),
      });

      // Wait for the AI's reply
      const data = await response.json();

      // Add AI response to chat
      setMessages(prev => [...prev, { text: data.message, isAi: true }]);
    } catch (error) {
      console.error('Error:', error);
      // Display error message if API call fails
      setMessages(prev => [
        ...prev,
        { text: 'Sorry, there was an error processing your request.', isAi: true }
      ]);
    } finally {
      // Stop loading animation
      setIsLoading(false);
    }
  };

  // ---------------- JSX RENDER ----------------
  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header section with app title */}
      <div className="w-full bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <span className="text-pink-600">Nexi AI</span> Chat Assistant
          </h1>
        </div>
      </div>

      {/* ---------------- MAIN CHAT AREA ---------------- */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Show "Start a conversation" message if chat is empty */}
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
            {/* Decorative chat bubble icon */}
            <svg
              className="w-16 h-16 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            <p className="text-xl font-medium">Start a conversation</p>
            <p className="mt-2">Ask me anything!</p>
          </div>
        ) : (
          // Render all messages (user + AI)
          messages.map((message, index) => (
            <ChatMessage key={index} message={message.text} isAi={message.isAi} />
          ))
        )}

        {/* Loading indicator (bouncing dots) while waiting for AI reply */}
        {isLoading && (
          <div className="flex items-center justify-center space-x-2 p-4">
            <div className="animate-bounce h-2 w-2 bg-pink-500 rounded-full"></div>
            <div className="animate-bounce h-2 w-2 bg-pink-500 rounded-full delay-100"></div>
            <div className="animate-bounce h-2 w-2 bg-pink-500 rounded-full delay-200"></div>
          </div>
        )}

        {/* Empty div to mark the bottom for auto-scrolling */}
        <div ref={messagesEndRef} />
      </div>

      {/* ---------------- INPUT SECTION ---------------- */}
      <div className="flex-none p-6 bg-white border-t border-gray-200 shadow-lg">
        <form onSubmit={handleSubmit} className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col space-y-3">
            {/* Input field and Send button */}
            <div className="relative flex items-center">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 min-h-[60px] w-full rounded-2xl border-2 border-gray-300 px-6 py-4 text-base focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50 transition-all duration-200 pr-16"
                disabled={isLoading} // Disable typing while AI is thinking
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()} // Disable send if empty or loading
                className="absolute right-2 inline-flex items-center justify-center w-12 h-12 rounded-xl text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                {/* Send icon */}
                <PaperAirplaneIcon className="h-6 w-6 rotate-90" />
              </button>
            </div>

            {/* Small helper text below input */}
            <p className="text-xs text-gray-500 text-center">
              Press Enter to send your message
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

// Exporting Chat component so it can be used in App.jsx
export default Chat;
