import React from 'react';
import ResumeUpload from './ResumeUpload';
import JobDescriptionInput from './JobDescriptionInput';
import ScreenButton from './ScreenButton';

const InputPanel = ({ onFileChange, onDescriptionChange, onScreenClick, isLoading, resumeFile }) => {
  return (
    <div className="bg-white my-0 p-6 rounded-xl shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">Upload Resume and Job Description</h2>
      <ResumeUpload onFileChange={onFileChange} resumeFile={resumeFile} />
      <JobDescriptionInput onDescriptionChange={onDescriptionChange} />
      <div className="mt-6 flex justify-center">
        <ScreenButton onClick={onScreenClick} isLoading={isLoading} />
      </div>
    </div>
  );
};

// Add this line to make the component a default export
export default InputPanel;