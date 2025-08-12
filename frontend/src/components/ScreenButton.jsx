import React from 'react';

const ScreenButton = ({ onClick, isLoading }) => {
  return (
    <div className="flex flex-col items-center">
      <button
        onClick={onClick}
        disabled={isLoading}
        // Add 'rounded-md' class here
        className={`flex items-center justify-center space-x-2 px-4 py-3 rounded-xl text-white font-semibold transition-colors duration-200
          ${isLoading
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
          }`}
      >
        <svg
          className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          {isLoading ? (
            <path d="M12 2a10 10 0 1010 10A10.01 10.01 0 0012 2zm0 18a8 8 0 118-8 8.01 8.01 0 01-8 8z" />
          ) : (
            <path
              fillRule="evenodd"
              d="M16.5 7.5a.75.75 0 00-1.5 0v5.69l-1.394-1.393a.75.75 0 00-1.06 1.06l2.5 2.5a.75.75 0 001.06 0l2.5-2.5a.75.75 0 00-1.06-1.06l-1.394 1.394V7.5zM4.5 21a.75.75 0 00.75-.75V8.69l1.394 1.393a.75.75 0 001.06-1.06l-2.5-2.5a.75.75 0 00-1.06 0l-2.5 2.5a.75.75 0 101.06 1.06l1.394-1.394V20.25a.75.75 0 00.75.75z"
              clipRule="evenodd"
            />
          )}
        </svg>
        <span>{isLoading ? 'Screening...' : 'Screen Resume'}</span>
      </button>

      {/* loading message */}
      {isLoading && (
        <div className="mt-4 text-center text-sm text-gray-500 max-w-xs">
          <p>Please be patient, it may take 2-3 minutes to process your file upon first request.</p>
          <p>Grab a quick glass of water while you wait! ☕</p>
        </div>
      )}
    </div>
  );
};

export default ScreenButton;