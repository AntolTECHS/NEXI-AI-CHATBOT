// Import React and icons from Heroicons
import React from 'react';
import { UserIcon, ComputerDesktopIcon } from '@heroicons/react/24/outline';

// ChatMessage component takes two props:
// - message: the text content of the chat message
// - isAi: boolean (true if message is from AI, false if from user)
const ChatMessage = ({ message, isAi }) => {
  return (
    // Outer container for each message bubble
    // Uses conditional Tailwind classes to style AI and user messages differently
    <div
      className={`max-w-7xl mx-auto flex items-start space-x-4 p-6 rounded-2xl transition-colors duration-200 ${
        isAi ? 'bg-blue-100' : 'bg-pink-50'
      }`}
    >
      {/* Icon section (AI gets computer icon, user gets user icon) */}
      <div
        className={`flex-shrink-0 rounded-full p-2 ${
          isAi ? 'bg-blue-100' : 'bg-green-100'
        }`}
      >
        {isAi ? (
          // AI icon (computer)
          <ComputerDesktopIcon className="h-6 w-6 text-blue-600" />
        ) : (
          // User icon (person)
          <UserIcon className="h-6 w-6 text-green-600" />
        )}
      </div>

      {/* Message text section */}
      <div className="flex-1 space-y-2">
        {/* Message sender label (Nexi AI Assistant or You) */}
        <div className="flex items-center">
          <p className={`font-medium ${isAi ? 'text-blue-900' : 'text-green-900'}`}>
            {isAi ? 'Nexi AI Assistant' : 'You'}
          </p>
        </div>

        {/* Actual message text */}
        <div className="prose prose-sm max-w-none">
          <p className="text-gray-700 text-base leading-relaxed whitespace-pre-wrap">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
};

// Export the component for use in other files (e.g., Chat.jsx)
export default ChatMessage;
