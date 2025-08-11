import React from 'react';
import ResumeUpload from './ResumeUpload';
import JobDescriptionInput from './JobDescriptionInput';
import ScreenButton from './ScreenButton';

const InputPanel = ({ onFileChange, onDescriptionChange, onScreenClick, isLoading }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">Upload Resume and Job Description</h2>
      <ResumeUpload onFileChange={onFileChange} />
      <JobDescriptionInput onDescriptionChange={onDescriptionChange} />
      <div className="mt-6 flex justify-center">
        <ScreenButton onClick={onScreenClick} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default InputPanel;