import React from 'react';

const JobDescriptionInput = ({ onDescriptionChange }) => {
  const handleChange = (event) => {
    onDescriptionChange(event.target.value);
  };

  return (
    <div className="mt-6">
      <label htmlFor="job-description" className="block text-sm font-medium text-gray-700 mb-2">Job Description</label>
      <textarea
        id="job-description"
        name="job-description"
        rows="8"
        className="block w-full rounded-xl border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        placeholder="Paste the job description here..."
        onChange={handleChange}
      ></textarea>
    </div>
  );
};

export default JobDescriptionInput;