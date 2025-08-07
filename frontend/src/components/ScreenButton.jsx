import React from 'react';

const ScreenButton = () => {
  return (
    <button
      type="button"
      className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
    >
      <svg className="-ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10 2a8 8 0 100 16A8 8 0 0010 2zm1 12.01a1 1 0 01-2 0v-5a1 1 0 012 0v5zm-1-7a1 1 0 110-2 1 1 0 010 2z" />
      </svg>
      Screen Resume
    </button>
  );
};

export default ScreenButton;